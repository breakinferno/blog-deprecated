<template>
  <div id="app"
       v-scroll="handleScroll">
    <el-container>
      <transition>
        <el-header :class="{modify}">
          <blog-header ref="header"
                       @modify="handleModify"></blog-header>
        </el-header>
      </transition>
      <div class="wrapper">
        <el-main>
          <el-container>
            <!-- <div class="wrapper"></div> -->
            <el-aside class="left-aside">
              <introduction></introduction>
            </el-aside>
            <!-- <router-view name="left-sider"></router-view> -->
            <div class="content">
              <router-view></router-view>
            </div>
            <!-- <router-view name="right-sider"></router-view> -->
            <el-aside class="right-aside">
              <panel></panel>
            </el-aside>
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
import Introduction from '@/components/Introduction'
export default {
  name: 'app',
  data () {
    return {
      modify: false
    }
  },
  components: {
    // ApolloExample
    BlogHeader,
    BlogFooter,
    Introduction
  },
  methods: {
    handleModify () {
      this.modify = true
    },
    handleScroll (evt, el, binding, last, cb) {
      if (window.scrollY - last > 50) {
        // 唤醒header
        // this.awake = true
        this.$refs.header.handleTimeout()
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
    background-size: cover;
    background-attachment: fixed;
    padding-top: 30px;
    .el-container {
      justify-content: center;
    }
    .content {
      max-width: 900px;
      // min-width: 600px;
      flex: 1;
      padding: 0 45px;
    }
  }
  .el-main {
    overflow: visible;
    height: 1800px;
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
    // position: absolute;
    // top: 0px;
    // left: 0px;
    // width: 100%;
    // // padding-top: 60px;
    // bottom: 0px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // min-width: 1220px;
  }
}
</style>
