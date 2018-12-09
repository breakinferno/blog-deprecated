<template>
  <div id="app">
    <el-container>
      <el-header>
        <blog-header></blog-header>
      </el-header>
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
  components: {
    // HelloWorld
    BlogHeader,
    BlogFooter
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
  }
  .el-container {
    height: 100%;
  }
}
</style>
