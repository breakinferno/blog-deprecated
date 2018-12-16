<template>
  <div id="nav"
       :class="{modify}">
    <el-menu :default-active="activeIndex"
             class="blog-nav"
             mode="horizontal"
             @select="handleSelect">
      <el-menu-item v-for="menu in menus"
                    :key="menu.name"
                    :index="menu.name">
        <router-link class="nav-item"
                     :to="{name: menu.name}">{{menu.description}}</router-link>
      </el-menu-item>
      <el-menu-item v-if="!isLogin"
                    index="login">
        <router-link class="nav-item"
                     :to="{name: 'login'}">登录</router-link>
      </el-menu-item>
      <el-menu-item v-else
                    @click="handleLogout"
                    index="logout">注销</el-menu-item>
      <!-- <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu> -->
    </el-menu>
  </div>
</template>
<script>
// import router from '@/router'
const menus = {
  home: {
    description: '首页',
    name: 'home'
  },
  tags: {
    description: '标签云',
    name: 'tags'
  },
  docs: {
    description: '归档',
    name: 'post'
  },
  about: {
    description: '关于我',
    name: 'about'
  }
}
export default {
  props: {
    modify: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      nav: 'nav',
      isTop: true,
      isVisible: true,
      menus,
      activeIndex: 'home'
    }
  },
  created () {
    this.scroll()
  },
  computed: {
    isLogin () {
      let flag = sessionStorage.getItem('username')
      let flag02 = true // this.$store.state.user.isLogin;
      return !!(flag && flag02)
    }
  },
  methods: {
    scroll () {
      let beforeScrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      window.onscroll = () => {
        const afterScrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop
        const delta = afterScrollTop - beforeScrollTop
        this.isTop = afterScrollTop === 0
        if (delta === 0) return false
        beforeScrollTop = afterScrollTop
        this.isVisible = delta <= 0
        if (afterScrollTop < 48) {
          this.isVisible = true
        }
      }
    },
    handleLogout () {
      this.$message({
        message: '成功登出',
        type: 'success',
        center: true
      })
      // this.$store.dispatch('logoutUser')
      // router.push({ name: 'Index' })
      // this.$message({
      //   message: '登出成功!',
      //   type: 'success'
      // })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
#nav {
  position: absolute;
  width: 100%;
  .blog-nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    border: none;
  }
  .el-menu,
  .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    background-color: inherit;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: white;
    border: none;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    color: white;
    font-size: 18px;
  }
  .el-menu--horizontal > .el-menu-item {
    border: none;
  }
  &.modify {
    background: white;
    border-bottom: 1px solid #00000033;
    .el-menu--horizontal > .el-menu-item.is-active {
      color: black;
      font-size: 18px;
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      color: black;
    }
  }
}
</style>
