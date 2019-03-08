<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
#app{
  min-height: 100%;
  width: 100%;

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
