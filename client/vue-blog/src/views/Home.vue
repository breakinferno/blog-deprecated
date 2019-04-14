<template>
  <div class="home">
    <!-- <img alt="Vue logo"
         src="../assets/logo.png"> -->
    <!-- <timeline :dataList="dataList"> -->
    <!-- 可扩展插槽okok这里可自定义 -->
    <!-- <div slot-scope="slotProps">
        {{slotProps.item.title}}
      </div> -->
    <!-- </timeline> -->
    <template v-if="dataList && dataList.length">
        <card v-for="(data, index) in dataList" :key="index" :data="data"></card>
    </template>
    <div class="no-post" v-else>
        <img src="../assets/empty.png" alt="没有博客内容">
        <p>博主很懒，还没有写博客哟~~~</p>
    </div>
  </div>
</template>

<script>
import { get } from '../utils/request.js'
// @ is an alias to /src
// import Timeline from '@/components/Timeline'
export default {
  name: 'home',
  components: {
    // Timeline
  },
  beforeMount () {
    if (this.$store.state.showAnimationBeforeEnter) {
      this.$router.push('background')
    }
  },
  created () {
    get('/posts').then(res => {
      console.log(res)
      if (res.code === 0) {
        this.dataList = res.data
      }
    }).catch(err => {
      console.log(err)
    })
  },
  data () {
    return {
      dataList: []
    }
  }
}
</script>
<style lang="less" scoped>
.home {

    .no-post{
        width: 100%;
        text-align: center;
        height: 270px;
        min-height: 240px;
        background: rgba(255, 255, 255, .6);

        img{
            margin: 56px auto 0;
        }

        p{
            padding-top: 14px;
            font-size: 14px;
            letter-spacing: 0;
            color: #99a2aa;
        }
    }
}
</style>
