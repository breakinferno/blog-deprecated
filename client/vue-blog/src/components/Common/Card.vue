<template>
  <article class="blog-card"
           @click="handleCard({path: `/posts/${item.id}`})">
    <div class="card-header"
         v-if="!imgUrl">
      <h3 class="card-header-title">{{title}}</h3>
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
          <viewer :value="item.overview"></viewer>
        </div>
        <span class="card-header-tag">
          <span>阅读全文
            <i>></i>
            <i>></i>
          </span>
          <tag :tags="item.tags"></tag>
        </span>
        <div class="card-detail-info">
          <el-button type="primary"
                     icon="el-icon-view">{{item.meta.views}}</el-button>
          <el-button type="primary"
                     icon="el-icon-search">{{item.meta.downloads}}</el-button>
          <el-button type="primary"
                     icon="el-icon-star-on">{{item.meta.like}}</el-button>
          <el-button type="primary"
                     icon="el-icon-share">{{item.meta.shares}}</el-button>
        </div>
      </div>
    </div>
    <div class="card-date">
      <div class="date-month">{{extractDate(item.updatedAt, 'm')}}月</div>
      <div class="date-day">{{extractDate(item.updatedAt, 'd')}}</div>
    </div>
    <div class="card-category"
         v-if="item.category">
      <a :href="'/categories/' + item.category">{{item.category}}</a>
    </div>
    <div class="card-bdage"></div>
  </article>
</template>
<script>
import { Viewer } from '@toast-ui/vue-editor'
import 'tui-editor/dist/tui-editor-contents.css'
import 'highlight.js/styles/github.css'
import getter from '../../utils/getter.js'
// 生成随机图片函数
function generateImg () {
  return {
    img: '../../assets/images/7.jpg'
  }
}
export default {
  components: {
    Viewer
  },
  props: {
    data: {
      type: Object,
      required: true,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        // return ['success', 'warning', 'danger'].indexOf(value) !== -1
        let mustKeys = ['overview', 'tags', 'category', 'title', 'updatedAt', 'id', 'meta.downloads', 'meta.views', 'meta.like', 'meta.shares']
        return mustKeys.every(key => {
          return getter(value, key) !== 'undefined'
        })
      }
    }
  },
  data () {
    return {
      item: {
        ...this.data,
        ...generateImg()
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
        'd': d[2].slice(0, 2)
      }[flag] || 1
    },
    handleCard (route) {
      this.$router.push({ ...route })
    }
  }
}
</script>
<style lang="less" scoped>
@keyframes next {
  0% {
    color: #68c4f3;
  }
  100% {
    color: black;
  }
}
.blog-card {
  background: white;
  position: relative;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 400px;
  .card-detail-info {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;
    button:nth-child(2) {
      right: 100px;
    }
    button:nth-child(3) {
      right: 160px;
    }
    button:nth-child(4) {
      right: 220px;
    }
    .el-button--primary {
      background: none;
      border: none;
      color: black;
      padding: 0;
      margin: 0;
      position: absolute;
      &:hover {
        background: none;
        border: none;
        color: black;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  &:last-child {
    margin: 0px;
  }
  .card-img {
    width: 100%;
    min-height: 240px;
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
      span {
        font-weight: bold;
      }
    }
  }

  .card-content {
    // padding: 20px 0px;
    .card-detail-content {
      padding: 20px;
      text-align: left;
      min-height: 56px;
      box-sizing: border-box;
      line-height: 20px;
    }
    .card-header-tag {
      display: flex;
      font-size: 14px;
      font-weight: bold;
      align-items: center;
      justify-content: space-between;
      padding-left: 20px;
      text-decoration: underline;
      cursor: pointer;
      i:nth-child(1) {
        animation: next 1s ease-in-out 0s infinite;
      }
      i:nth-child(2) {
        animation: next 1s ease-in-out 0.5s infinite;
      }
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
    font-size: 16px;
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
      font-weight: bold;
    }
  }
}
</style>
