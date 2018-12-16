<template>
    <div id="time-line"
         :class="classObj">
        <!-- <slot> -->
        <div class="timeline-row"
             v-for="(item, index) in dataList"
             :key="index">
            <!-- 默认插槽内容 -->
            <slot :item="item">
                <div class="timeline-img">
                    <avatar :shape="shape"
                            :src="item.img"
                            v-if="item.img"></avatar>
                    <avatar :shape="shape">{{item.time | formatDate}}</avatar>
                </div>
                <div class="timeline-content">
                    <div class="content-body">
                        <h2>{{ item.title }}</h2>
                        <p>
                            {{ item.content }}
                        </p>
                    </div>
                </div>
            </slot>
        </div>
        <!-- </slot> -->
    </div>
</template>
<script>
// 支持插槽扩展
import getter from '@/utils/getter'
import { parseTime } from '@/utils/time'
export default {
  props: {
    dataList: {
      type: Array,
      default: function () {
        return []
      },
      validator: function (value) {
        if (Array.isArray(value)) {
          // 必须有title和content属性
          return value.every(val => {
            return getter(val, 'title') && getter(val, 'content') && getter(val, 'time')
          })
        }
        return false
      },
      required: true
    },
    direction: {
      default: 'vertical-right',
      type: String,
      validator: function (value) {
        return ['vertical-right', 'vertical-left', 'vertical-aside'].includes(value)
      }
    },
    // 形状
    shape: {
      type: String,
      default: 'square',
      validator: function (value) {
        return ['circle', 'square'].includes(value)
      }
    }
  },
  data () {
    let dir = this.direction.split('-')[1]
    return {
      classObj: {
        left: dir === 'left',
        right: dir === 'right',
        aside: dir === 'aside'
      }
    }
  },
  //   render: function (createElement, context) {
  //     const slots = this.$slots.default
  //     return createElement('div', {
  //       id: 'time-line'
  //     }, slots)
  //   },
  filters: {
    formatDate (time) {
      return parseTime(time, '{y}年{m}月{d} {h}:{i}')
    }
  }
}
</script>
<style lang="less" scoped>
#time-line {
  display: flex;
  flex-direction: column;
  .timeline-row {
    display: flex;
    position: relative;
    .timeline-img {
      position: absolute;
      top: 0px;
      left: 0px;
      //   background: #0d395f;
      box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.75);
    }

    .timeline-content {
      position: relative;
      margin-left: 60px;
      padding: 1em;
      box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.75);
      &::before {
        content: '';
        position: absolute;
        top: 16px;
        right: 100%;
        height: 0;
        width: 0;
        border: 7px solid transparent;
        border-right: 7px solid white;
      }
      &::after {
        content: '';
        display: table;
        clear: both;
      }
    }
  }
  &.right {
  }

  &.left {
  }
  &.aside {
  }
}
</style>
