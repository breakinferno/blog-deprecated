<template>
  <article class="blog-card">
    <div class="card-header"
         v-if="!imgUrl">
      <h3 class="card-header-title">this is title</h3>
    </div>
    <div class="card-img"
         v-if="imgUrl"
         :style="{backgroundImage: 'url(' + imgUrl + ')'}">
      <div class="img-header">
        <span>{{item.title}}</span>
      </div>
    </div>
    <div class="card-content">
      <div class="card-detail">
        <div class="card-detail-content">
          &emsp;{{item.content}}
        </div>
        <span class="card-header-tag">
          <tag :tags="item.tags"></tag>
        </span>
        <div class="card-detail-info">
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
    <div class="card-date">
      <div class="date-month">{{extractDate(item.time, 'm')}}月</div>
      <div class="date-day">{{extractDate(item.time, 'd')}}</div>
    </div>
    <div class="card-category"
         v-if="item.category">
      <a :href="'/categories/' + item.category">{{item.category}}</a>
    </div>
    <div class="card-bdage"></div>
  </article>
</template>
<script>
export default {
  data () {
    return {
      item: {
        title: 'mdzz this is title',
        tags: ['science', 'technology', 'game'],
        content: '测试内容测试内容测试内容测试内容测试内容测试内容内容测试内容测试内容测试内容内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测内容试内容测内容试测内容试测试测试',
        img: '../../assets/images/7.jpg',
        avatar: '',
        time: '2018-2-23',
        view: 233,
        comment: 23,
        star: 22,
        share: 232,
        category: 'test'
      }
    }
  },
  computed: {
    imgUrl () {
      // console.log(require.context('../../assets/images/', true, /7\.jpg/))
      // 不支持动态require 只有编译时先预先加载匹配路劲所有文件
      let name = require('path').basename(this.item.img)
      return this.item.img ? require('../../assets/images/' + name)
        : false
    }
  },
  methods: {
    extractDate (date, flag) {
      let d = date.split('-')
      return {
        'm': d[1],
        'y': d[0],
        'd': d[2]
      }[flag] || 1
    }
  }
}
</script>
<style lang="less" scoped>
.blog-card {
  background: white;
  position: relative;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 400px;
  &:last-child {
    margin: 0px;
  }
  .card-img {
    width: 100%;
    // height: 0;
    // padding-bottom: 40%;
    position: relative;
    box-sizing: border-box;
    background-size: cover;
    flex-grow: 1;
    .img-header {
      background: #00000099;
      color: white;
      font-size: 22px;
      text-align: left;
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      box-sizing: border-box;
    }
  }

  .card-content {
    // padding: 20px 0px;
    .card-detail-content {
      padding: 20px;
      text-align: left;
      min-height: 56px;
      box-sizing: border-box;
    }
  }

  .card-date {
    background-color: #97dffd;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    top: -20px;
    left: -20px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    line-height: 1.1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    .date-month {
      font-size: 14px;
    }
    .date-day {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .card-category {
    position: absolute;
    left: -16px;
    top: 105px;
    border-color: #47456d;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background-color: #97dffd;
    margin: 5px 0;
    font-size: 14px;
    border-radius: 0 4px 4px 0;
    display: inline-block;
    padding: 7px 11px 7px 32px;
    line-height: 1;
    &::after {
      position: absolute;
      content: '';
      top: 100%;
      left: 0;
      border-top: 0 solid transparent;
      border-right-width: 1em;
      border-right-color: inherit;
      border-right-style: solid;
      border-bottom: 1em solid transparent;
      border-left: 0 solid transparent;
      width: 0;
      height: 0;
    }
    a {
      color: #fff;
    }
  }
}
</style>
