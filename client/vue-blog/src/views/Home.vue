<template>
  <div class="home">
    <!-- <img alt="Vue logo"
         src="../assets/logo.png"> -->
    <timeline :dataList="dataList">
      <!-- 可扩展插槽 -->
      <!-- <div slot-scope="slotProps">
        {{slotProps.item.title}}
      </div> -->
    </timeline>
  </div>
</template>

<script>
// @ is an alias to /src
import Timeline from '@/components/Timeline'
export default {
  name: 'home',
  components: {
    Timeline
  },
  data () {
    return {
      dataList: [
        { title: 'mdzz', content: 'hah', time: Date.now() },
        { title: 'wodetian', content: 'hah', time: Date.now() },
        { title: '服了', content: 'hah', time: Date.now() }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  flex: 1;
}
</style>
