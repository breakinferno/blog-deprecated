<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Layout>
      <Header>
        <blog-header></blog-header>
      </Header>
      <Layout>
        <sider hide-trigger>Sider</sider>
        <Content>
          <transition name="fade">
            <router-view class="router-view"></router-view>
          </transition>
        </Content>
        <sider hide-trigger>Sider</sider>
      </Layout>
      <Footer>
        <blog-footer></blog-footer>
      </Footer>
    </Layout>
  </div>
</template>

<script>
import BlogHeader from '@/components/Header'
import BlogFooter from '@/components/Footer'
export default {
  name: 'app',
  components: {
    BlogHeader,
    BlogFooter
  }
}
</script>

<style scoped lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: white;

  [class*="ivu-layout"] {
    background: white;
  }
  /* color: #2c3e50; */
}
</style>
