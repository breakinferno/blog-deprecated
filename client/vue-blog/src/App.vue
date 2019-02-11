<template>
  <div id="app"
       v-scroll="handleScroll">
    <el-container v-show="!showAnimationBeforeEnter">
      <transition>
        <el-header :class="{modify}">
          <blog-header ref="header"
                       @modify="handleModify"></blog-header>
        </el-header>
      </transition>
      <div class="wrapper">
        <el-main>
          <el-container>
            <Container orientation="horizontal"
                       @drop="onColumnDrop($event)"
                       drag-handle-selector=".drag-handler"
                       @drag-start="dragStart"
                       class="el-container">
              <!-- <Draggable key="introduction"> -->
              <el-aside class="left-aside"
                        v-show="showLeftSide">
                <!-- <introduction></introduction> -->
                <div :is="scene.children[0].component"></div>
              </el-aside>
              <!-- </Draggable> -->
              <div class="content"
                   :class="{'fullScreen': !showLeftSide && !showRightSide}">
                <router-view></router-view>
              </div>
              <!-- <Draggable key="test"> -->
              <el-aside class="right-aside"
                        v-show="showRightSide">
                <!-- <panel></panel> -->
                <div :is="scene.children[1].component"></div>
              </el-aside>
              <!-- </Draggable> -->
            </Container>

          </el-container>
        </el-main>
      </div>
      <el-footer>
        <blog-footer></blog-footer>
      </el-footer>
    </el-container>
    <div id="background" v-show="showAnimationBeforeEnter">
      <!--开头动画-->
      <animate-bg :forceSkip="isAnimateOver"
                  class="blog-animate-bg"
                  v-show="!isAnimateOver"
                  v-if="showAnimationBeforeEnter"
                  @animateEnd="isAnimateOver = true"></animate-bg>
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
                @click.prevent="stepMainPage">
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
        </transition>
        <canvas ref="canvas"
                id="canvas"
                v-show="isAnimateOver"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import Panel from '@/components/Common/Panel'
import BlogHeader from '@/components/Header'
import BlogFooter from '@/components/Footer'
import Introduction from '@/components/Introduction'
import { applyDrag } from '@/utils/dnd'
import { mapState, mapMutations } from 'vuex'
import AnimateBg from './components/AnimateBg'
import Config from './config'

const draggableComp = [{
  id: `introduction`,
  type: 'container',
  component: 'introduction'
}, {
  id: 'test',
  type: 'container',
  component: 'panel'
}
]
export default {
  name: 'app',
  data () {
    return {
      ...Config.User,
      modify: false,
      isAnimateOver: false,
      scene: {
        type: 'container',
        children: draggableComp
      }
    }
  },
  computed: {
    ...mapState(['layout', 'showLeftSide', 'showRightSide', 'showAnimationBeforeEnter'])
  },
  components: {
    // ApolloExample
    BlogHeader,
    BlogFooter,
    Panel,
    Introduction,
    Container,
    Draggable,
    AnimateBg
  },
  methods: {
    ...mapMutations(['triggerHeader', 'hideAnimationPage']),
    onColumnDrop (dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
      console.log(this.scene.children)
    },
    dragStart () {
      console.log('drag started')
    },
    // onCardDrop (columnId, dropResult) {
    //   if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    //     const scene = Object.assign({}, this.scene)
    //     const column = scene.children.filter(p => p.id === columnId)[0]
    //     const columnIndex = scene.children.indexOf(column)
    //     const newColumn = Object.assign({}, column)
    //     newColumn.children = applyDrag(newColumn.children, dropResult)
    //     scene.children.splice(columnIndex, 1, newColumn)
    //     this.scene = scene
    //   }
    // },
    stepMainPage () {
      this.hideAnimationPage()
      this.$router.push({ path: '/' })
    },
    handleModify () {
      this.modify = true
    },
    handleScroll (evt, el, binding, last, cb) {
      if (window.scrollY - last > 50) {
        // 唤醒header
        this.triggerHeader(true)
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        cb && cb(window.scrollY)
      }, 100)
    }
  },
  mounted () {
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
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;

  .wrapper {
    width: 100%;
    background-image: url('./assets/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    padding-top: 30px;
    min-height: 100%;
    box-sizing: border-box;
    aside {
      overflow: hidden;
    }
    .el-container {
      justify-content: center;
    }
    .content {
      max-width: 900px;
      // min-width: 600px;
      flex: 1;
      margin: 0 45px;
      // background: #fbfbfb;
      white-space: normal;
    }
    .content.fullScreen {
      max-width: none;
    }
  }
  .el-main {
    overflow: visible;
  }
  .el-header {
    padding: 0px;
    height: 100% !important;
    transition: all 1.5s ease;
    z-index: 1;
    &.modify {
      height: 60px !important;
      position: fixed;
      width: 100%;
      // z-index: -1;
    }
  }
  .el-footer {
    height: 0 !important;
    background: none;
  }
  .el-aside {
    background: white;
    align-self: self-start;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .el-aside.left-aside {
    width: 200px !important;
  }
  & > .el-container {
    display: flex;
    justify-content: space-between;
  }

  // background
  #background{
    height: 100%;
  }

  #canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
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
