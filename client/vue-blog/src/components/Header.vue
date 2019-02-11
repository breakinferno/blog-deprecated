<template>
  <div id="blog-header"
       :class="{timeout: isHide}"
       @mouseover.prevent="hoverHeader(true)"
       @mouseleave.prevent="hoverHeader(false)">
    <!--导航栏-->
    <blog-nav></blog-nav>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import BlogNav from './Nav'
import { insertElement } from '@/utils/insertElement'
export default {
  components: {
    BlogNav
  },
  data () {
    return {
      timeout: false, // 是否隐藏header
      isHover: false
    }
  },
  props: {
    awake: Boolean
  },
  mounted () {
    this.handleTimeout()
  },
  computed: {
    isHide () {
      return this.timeout && !this.isHover
    },
    ...mapState(['showHeader'])
  },
  watch: {
    showHeader (newVal) {
      if (newVal) {
        this.timeout = false
        this.handleTimeout()
      }
    }
  },
  methods: {
    ...mapMutations(['triggerHeader']),
    hoverHeader (flag) {
      this.isHover = flag
    },
    handleTimeout () {
      if (this.timeout) {
        this.timeout = false
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.timeout = true
        this.triggerHeader()
      }, 2000)
    },
    handleBeforeEnter () {
      // 去除hidden
      insertElement('style', "body, html{overflow: initial; background: url('../assets/bg.png')}", document && document.head)
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
  position: fixed;
  width: 100%;
  background: #0000003b;
  height: 100%;
  transition: transform 1s ease-in-out;
  background: white;
  // opacity: 0;
  height: 60px;
  &.timeout {
    transform: translateY(-60px);
  }
}
</style>
