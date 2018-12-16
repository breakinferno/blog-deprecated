<template>
  <div id="blog-header"
       @dblclick.prevent="skipAnimate"
       :class="{modify: stepInto}">
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
      isAnimateOver: false,
      stepInto: false
    }
  },
  mounted () {
    // BgAnimate()
    // console.dir(BgAnimate)
    // debugger
  },
  methods: {
    skipAnimate () {
      if (this.isAnimateOver) {
        return
      }
      this.isAnimateOver = true
    },
    handlePointerClick () {
      this.stepInto = true
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

  &.modify {
    background: white;
  }
  .blog-header-wrapper {
    height: 100%;
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
