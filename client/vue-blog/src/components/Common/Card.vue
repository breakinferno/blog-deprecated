<template>
  <div class="blog-card">
    <div class="card-header">
      <h3 class="card-header-title">this is title</h3>
      <span class="card-header-tag">
        <tag v-for="(tag, index) in item.tags"
             :key="index"
             :tag="tag"></tag>
      </span>
    </div>
    <div class="card-content">
      <div class="card-img"></div>
      <div class="card-detail">
        <div class="card-detail-content">
          {{item.content}}
        </div>
        <div class="card-detail-info">
          <el-button type="primary"
                     icon="el-icon-search">{{item.time}}</el-button>
          <el-button type="primary"
                     icon="el-icon-view">{{item.view}}</el-button>
          <el-button type="primary"
                     icon="el-icon-search">{{item.comment}}</el-button>
          <el-button type="primary"
                     icon="el-icon-star-on">{{item.star}}</el-button>
          <el-button type="primary"
                     icon="el-icon-share">{{item.share}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      item: {
        title: 'mdzz this is title',
        tags: ['science', 'technology', 'game'],
        content: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        img: '',
        avatar: '',
        time: '2018-2-23',
        view: 233,
        comment: 23,
        star: 22,
        share: 232
      }
    }
  }
}
</script>
