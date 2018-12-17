<template>
  <div id="app"
       v-scroll="handleScroll">
    <el-container>
      <transition>
        <el-header :class="{modify}">
          <blog-header @modify="handleModify"
                       :awake="awake"></blog-header>
        </el-header>
      </transition>
      <div class="wrapper">
        <el-main>
          <el-container>
            <!-- <div class="wrapper"></div> -->
            <el-aside>left aside</el-aside>
            <!-- <router-view name="left-sider"></router-view> -->
            <router-view></router-view>
            <!-- <router-view name="right-sider"></router-view> -->
            <el-aside>right aside</el-aside>
          </el-container>
        </el-main>
      </div>
      <el-footer>
        <blog-footer></blog-footer>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import BlogHeader from '@/components/Header'
import BlogFooter from '@/components/Footer'
export default {
  name: 'app',
  data () {
    return {
      modify: false,
      awake: false
    }
  },
  components: {
    // HelloWorld
    BlogHeader,
    BlogFooter
  },
  methods: {
    handleModify () {
      this.modify = true
    },
    handleScroll (evt, el, binding, last, cb) {
      if (window.scrollY - last > 100) {
        // 唤醒header
        this.awake = true
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        cb && cb(window.scrollY)
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

  .wrapper {
    width: 100%;
    background-image: url("./assets/bg.png");
    background-repeat: no-repeat;
    z-index: -1;
    background-size: cover;
    background-attachment: fixed;
  }
  .el-main {
    overflow: visible;
    height: 1800px;
  }
  .el-header {
    padding: 0px;
    height: 100% !important;
    transition: all 1.5s ease;
    &.modify {
      height: 60px !important;
      position: absolute;
      width: 100%;
      // z-index: -1;
    }
  }
  & > .el-container {
    // position: absolute;
    // top: 0px;
    // left: 0px;
    // width: 100%;
    // // padding-top: 60px;
    // bottom: 0px;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
