<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
export default {
  created () {
    this.getCategories()
    this.getTags()
  },
  methods: {
    ...mapActions({
      getCategories: 'getCategoriesReq', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`,
      getTags: 'getTagsReq'
    })
  }
}
</script>
<style lang="less" scoped>
#app{
  min-height: 100%;
  width: 100%;
  height: inherit;
  // height: 100%;
}
</style>
<style>
  html{
    background-image: url("./assets/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
</style>
