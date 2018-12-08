<template>
    <div id="blog-header">
        <blog-nav></blog-nav>
        <div class="img-wrap">
            <img />
        </div>
        <div class="text-wrap">
            <h1 class="shaddow">something</h1>
            <p class="shadow-light">woca</p>
        </div>
        <div class="pointer-wrap">
            <i class="el-icon-arrow-down"></i>
        </div>
    </div>
</template>
<script>
import BlogNav from './Nav'
export default {
  components: {
    BlogNav
  }
}
</script>
