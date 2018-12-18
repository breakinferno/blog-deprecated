<template>
  <div class="blog-tags">
    <ul class="blog-tag-list">
      <li class="tag-item"
          v-for="(tag, index) in tags"
          :key="index"><i class="tag-head"
           :style="{borderRightColor: sortedColors[index]}"></i><span :style="{background: sortedColors[index]}">{{tag}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
const colors = ['#918597', '#76becc', '#f08080', '#88acdb', '#bc8f8f', '#ffa07a'] // 一些比较合适的颜色

// const activeColor = '#9c9'
export default {
  props: {
    tags: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      sortedColors: [] // 缓存颜色
    }
  },
  mounted () {
    this.selectColor()
  },
  methods: {
    // 选取随机颜色集
    selectColor () {
      let target
      if (this.tags.length <= colors.length) {
        target = [...colors]
      } else {
        let time = Math.ceil(this.tags.length / colors.length)
        // 拷贝time次
        target = (colors.join(',') + ',').repeat(time).slice(0, -1).split(',')
      }
      for (let i = 0; i < this.tags.length; i++) {
        let index = Math.floor(Math.random() * (target.length - i))
        this.sortedColors.push(target[index])
        target[index] = target[target.length - i - 1]
      }
      // console.log(this.sortedColors)
    }
  }
}
</script>
<style lang="less" scoped>
.blog-tags {
  // display: inline-block;
  // height: 20px;
  // border: 1px solid black;
  // border-radius: 4px;
  .blog-tag-list {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .tag-item {
      display: inline-block;
      text-decoration: none;
      font-weight: normal;
      color: #fff;
      height: 18px;
      line-height: 18px;
      position: relative;
      border-radius: 0 5px 5px 0;
      margin: 5px 9px 5px 8px;
      opacity: 0.7;
      cursor: pointer;
      span {
        display: inline-block;
        text-align: justify;
        vertical-align: top;
        height: 18px;
        line-height: 18px;
        position: relative;
        padding-left: 10px;
        padding-right: 5px;
        font-size: 12px;
        &::before {
          content: " ";
          width: 4px;
          height: 4px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
          position: absolute;
          top: 0.4375rem;
          left: 0px;
        }
      }
      .tag-head {
        display: inline-block;
        width: 0px;
        height: 0px;
        border: 9px solid transparent;
      }
      &:hover {
        transition: all 0.2s linear;
        transform: scale(1.1);
        .tag-head {
          border-right-color: #9c9 !important;
        }
        span {
          &:hover {
            background: #9c9 !important;
          }
        }
      }
    }
  }
}
</style>
