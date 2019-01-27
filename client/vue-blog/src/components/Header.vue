<template>
  <div id="blog-header"
       @dblclick.prevent="skipAnimate"
       :class="{modify: stepInto, timeout: isHide}"
       @mouseover.prevent="hoverHeader(true)"
       @mouseleave.prevent="hoverHeader(false)">
    <!--导航栏-->
    <blog-nav :modify="stepInto"
              v-show="isAnimateOver"></blog-nav>
    <!--开头动画-->
    <animate-bg :forceSkip="isAnimateOver"
                class="blog-animate-bg"
                v-show="!isAnimateOver"
                @animateEnd="skipAnimate"></animate-bg>
    <!--背景墙-->
    <div v-show="isAnimateOver"
         class="blog-header-wrapper">
      <transition name="modify"
                  @before-leave="handleBeforeEnter"
                  @leave="handleStepInto">
        <div class="blog-header-content"
             v-if="!stepInto">
          <div class="text-wrap">
            <Avatar shape="circle"
                    size="large"
                    :src="avatarSrc" />
            <h1 class="headline">{{headline}}</h1>
            <p class="subline">{{subline}}</p>
          </div>
          <div class="pointer-wrap"
               @click.prevent="handlePointerClick">
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </transition>
      <canvas ref="canvas"
              id="canvas"
              v-show="isAnimateOver"></canvas>
    </div>
  </div>
</template>
<script>
import BlogNav from './Nav'
import Config from '../config'
import AnimateBg from './AnimateBg'
import { insertElement } from '@/utils/insertElement'
export default {
  components: {
    BlogNav,
    AnimateBg
  },
  data () {
    return {
      ...Config.User,
      isAnimateOver: false, // 控制背景墙的显示
      stepInto: false, // 进入主界面
      timeout: false, // 是否隐藏header
      isHover: false
    }
  },
  props: {
    awake: Boolean
  },
  mounted () {
    // BgAnimate()
    // console.dir(BgAnimate)
    // debugger
    let c = this.$refs.canvas
    let w = c.width = window.innerWidth

    let h = c.height = window.innerHeight

    let ctx = c.getContext('2d')

    let opts = {
      len: 20,
      count: 50,
      baseTime: 10,
      addedTime: 10,
      dieChance: 0.05,
      spawnChance: 1,
      sparkChance: 0.1,
      sparkDist: 10,
      sparkSize: 2,
      color: 'hsl(hue,100%,light%)',
      baseLight: 50,
      addedLight: 10,
      shadowToTimePropMult: 6,
      baseLightInputMultiplier: 0.01,
      addedLightInputMultiplier: 0.02,
      cx: w / 2,
      cy: h / 2,
      repaintAlpha: 0.04,
      hueChange: 0.1
    }

    let tick = 0

    let lines = []

    let dieX = w / 2 / opts.len

    let dieY = h / 2 / opts.len

    let baseRad = Math.PI * 2 / 6
    ctx.fillStyle = 'rgb(63, 82, 99)'
    ctx.fillRect(0, 0, w, h)

    function loop () {
      window.requestAnimationFrame(loop)
      ++tick
      ctx.globalCompositeOperation = 'source-over'
      ctx.shadowBlur = 0
      ctx.fillStyle = 'rgba(63,82,99,alp)'.replace('alp', opts.repaintAlpha)
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      if (lines.length < opts.count && Math.random() < opts.spawnChance) lines.push(new Line())
      lines.map(function (line) {
        line.step()
      })
    }

    function Line () {
      this.reset()
    }
    Line.prototype.reset = function () {
      this.x = 0
      this.y = 0
      this.addedX = 0
      this.addedY = 0
      this.rad = 0
      this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random()
      this.color = opts.color.replace('hue', tick * opts.hueChange)
      this.cumulativeTime = 0
      this.beginPhase()
    }
    Line.prototype.beginPhase = function () {
      this.x += this.addedX
      this.y += this.addedY
      this.time = 0
      this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0
      this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1)
      this.addedX = Math.cos(this.rad)
      this.addedY = Math.sin(this.rad)
      if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY) this.reset()
    }
    Line.prototype.step = function () {
      ++this.time
      ++this.cumulativeTime
      if (this.time >= this.targetTime) this.beginPhase()
      var prop = this.time / this.targetTime

      var wave = Math.sin(prop * Math.PI / 2)

      var x = this.addedX * wave

      var y = this.addedY * wave
      ctx.shadowBlur = prop * opts.shadowToTimePropMult
      ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin(
        this.cumulativeTime * this.lightInputMultiplier))
      ctx.fillRect(opts.cx + (this.x + x) * opts.len, opts.cy + (this.y + y) * opts.len, 2, 2)
      if (Math.random() < opts.sparkChance) {
        ctx.fillRect(opts.cx + (this.x + x) * opts.len + Math.random() *
          opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2, opts.cy + (this.y + y) *
          opts.len + Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2,
        opts.sparkSize, opts.sparkSize)
      }
    }
    loop()
    window.addEventListener('resize', function () {
      w = c.width = window.innerWidth
      h = c.height = window.innerHeight
      ctx.fillStyle = '#2085c5 '
      ctx.fillRect(0, 0, w, h)
      opts.cx = w / 2
      opts.cy = h / 2
      dieX = w / 2 / opts.len
      dieY = h / 2 / opts.len
    })
  },
  computed: {
    isHide () {
      return this.timeout && !this.isHover
    }
  },
  methods: {
    hoverHeader (flag) {
      this.isHover = flag
    },
    skipAnimate () {
      if (this.isAnimateOver) {
        return
      }
      this.isAnimateOver = true
    },
    handlePointerClick () {
      this.stepInto = true
      this.handleTimeout()
      // this.$bus.$emit('headerover', true)
      this.$store.commit({
        type: 'emitHeaderOver',
        value: true
      })
    },
    handleTimeout () {
      if (this.timeout) {
        this.timeout = false
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.timeout = true
      }, 2000)
    },
    handleBeforeEnter () {
      // 去除hidden
      insertElement('style', "body, html{overflow: initial; background: url('../assets/bg.png')}", document && document.head)
    },
    handleStepInto () {
      console.log('after leave')
      this.$emit('modify')
      // this.$emit('stepped')
    }
  }
  // watch: {
  //   awake (n, o) {
  //     console.log('new is:' + n + ', old is:' + o)
  //     this.handleTimeout()
  //   }
  // }
}
</script>

<style lang="less" scoped>
.modify-enter-active {
  transition: all 1.5s ease;
}
.modify-leave-active {
  transition: all 1.5s ease;
}

.modify-enter,
.modify-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
#blog-header {
  background: #0000003b;
  height: 100%;
  transition: transform 1s ease-in-out;
  #canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
  }
  &.modify {
    background: white;
    // opacity: 0;
    height: 60px;
  }
  &.timeout {
    transform: translateY(-60px);
  }
  .blog-header-wrapper {
    height: 100%;
    position: relative;
  }
  .blog-header-content {
    height: 100%;
    .center();
    &.modify {
      transition: transform 1s ease-in-out;
      transform: translateY(-100%);
      opacity: 0;
    }

    .img-wrap {
      .fillAll();
    }

    div {
      color: white;
    }
    .text-wrap {
      position: relative;
      top: -30px;
      .blog-avatar {
        width: 135px;
        height: 135px;
        img {
          height: 100%;
        }
      }
      .headline {
        margin-top: 8px;
        .rFont(24px);
      }
      .subline {
        .rFont(18px);
      }
    }
    .pointer-wrap {
      bottom: 60px;
      position: absolute;
      font-size: 36px;
      cursor: pointer;
      animation: bounce 1.4s infinite;
    }
    @keyframes bounce {
      0% {
        bottom: 60px;
      }
      50% {
        bottom: 80px;
      }
      100% {
        bottom: 60px;
      }
    }

    @keyframes step {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(5);
      }
      100% {
        transform: scale(1);
      }
    }
  }
}
</style>
