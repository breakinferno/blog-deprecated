<template>
  <span class="blog-tag">{{tag}}</span>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      required: true,
      default: '其他'
    }
  }
}
</script>
<style lang="less" scoped>
.blog-tag {
  display: inline-block;
  height: 20px;
  border: 1px solid black;
  border-radius: 4px;
}
</style>
