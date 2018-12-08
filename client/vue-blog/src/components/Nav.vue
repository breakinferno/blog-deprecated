<template>
    <div id="nav">
        <ul :class="['nav', { 'nav-fixed': !isTop, 'nav-invisible': !isVisible }]">
            <li>
                <router-link class="nav-item" :to="{name: 'Index'}">

                </router-link>
            </li>
            <li>
                <router-link class="nav-item" :to="{name: 'Index'}">首页</router-link>
            </li>
            <li>
                <router-link class="nav-item" :to="{name: 'tags'}">标签云</router-link>
            </li>
            <li>
                <router-link class="nav-item" :to="{name: 'post'}">归档</router-link>
            </li>
            <li>
                <router-link class="nav-item" :to="{name: 'about'}">关于我</router-link>
            </li>
            <li v-if="!isLogin">
                <router-link class="nav-item" :to="{name: 'login'}">登录</router-link>
            </li>
            <li v-else @click="handleLogout()">
                <span class="nav-item">登出</span>
            </li>
        </ul>
    </div>
</template>
<script>
import router from '@/router'

export default {
  data () {
    return {
      nav: 'nav',
      isTop: true,
      isVisible: true
    }
  },
  created () {
    this.scroll()
  },
  computed: {
    isLogin () {
      let flag = sessionStorage.getItem('username')
      let flag02 = false // this.$store.state.user.isLogin;
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
      this.$store.dispatch('logoutUser')
      router.push({ name: 'Index' })
      this.$message({
        message: '登出成功!',
        type: 'success'
      })
    }
  }
}
</script>
