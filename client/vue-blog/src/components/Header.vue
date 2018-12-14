<template>
  <div id="blog-header" @dblclick.prevent="skipAnimate">
    <animate-bg :forceSkip="isAnimateOver" class="blog-animate-bg"  v-show="!isAnimateOver" @animateEnd="skipAnimate"></animate-bg>
    <div v-show="isAnimateOver" class="blog-header-wrapper">
      <blog-nav></blog-nav>
      <div class="blog-header-content">
        <div class="text-wrap">
          <Avatar shape="circle"
                  size="large"
                  :src="avatarSrc" />
          <h1 class="headline">{{headline}}</h1>
          <p class="subline">{{subline}}</p>
        </div>
        <div class="pointer-wrap">
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlogNav from './Nav'
import Config from '../config'
import AnimateBg from './AnimateBg'
export default {
  components: {
    BlogNav,
    AnimateBg
  },
  data () {
    return {
      ...Config.User,
      isAnimateOver: false
    }
  },
  mounted () {
    // BgAnimate()
    // console.dir(BgAnimate)
    // debugger
  },
  methods: {
    skipAnimate () {
      console.log('skip all')
      this.isAnimateOver = true
    }
  }
}
</script>

<style lang="less" scoped>
#blog-header {
  background: #0000003b;
  height: 100%;
  .blog-header-wrapper{
    height: 100%;
  }
  .blog-header-content {
    height: 100%;
    .center();
    .img-wrap {
      .fillAll();
    }

    div{
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
  }
}
</style>
