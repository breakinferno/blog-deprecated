<template>
    <div id="blog-header">
        <blog-nav></blog-nav>
        <div class="img-wrap">
            <img src="" />
        </div>
        <div class="text-wrap">
            <Avatar shape="circle"
                    size="large"
                    :src="avatarSrc" />
            <h1 class="shaddow">{{headline}}</h1>
            <p class="shadow-light">{{subline}}</p>
        </div>
        <div class="pointer-wrap">
            <i class="el-icon-arrow-down"></i>
        </div>
    </div>
</template>
<script>
import BlogNav from './Nav'
import Config from '../config'
export default {
  components: {
    BlogNav
  },
  data () {
    return {
      ...Config.User
    }
  }
}
</script>

<style lang="less" scoped>
#blog-header {
  .img-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
