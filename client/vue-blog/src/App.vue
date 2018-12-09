<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
