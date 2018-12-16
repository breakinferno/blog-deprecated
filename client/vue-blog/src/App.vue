<template>
  <div id="app">
    <el-container>
      <transition>
        <el-header :class="{modify}">
          <blog-header @modify="handleModify"></blog-header>
        </el-header>
      </transition>
      <el-main>
        <el-container>
          <el-aside>left aside</el-aside>
          <!-- <router-view name="left-sider"></router-view> -->
          <router-view></router-view>
          <!-- <router-view name="right-sider"></router-view> -->
          <el-aside>right aside</el-aside>
        </el-container>
      </el-main>
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
      modify: false
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
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  .el-main {
    overflow: visible;
  }
  .el-header {
    padding: 0px;
    height: 100% !important;
    transition: all 1.5s ease;
    &.modify {
      height: 60px !important;
    }
  }
  .el-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
