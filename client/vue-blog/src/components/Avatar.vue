<template>
  <span :class="classes">
    <img :src="src"
         v-if="src">
    <Icon :type="icon"
          :custom="customIcon"
          v-else-if="icon"></Icon>
    <span ref="children"
          :class="[prefixCls + '-string']"
          :style="childrenStyle"
          v-else>
      <slot></slot>
    </span>
  </span>
</template>

<script>
import { oneOf } from '../utils/array.js'

const prefixCls = 'blog-avatar'

export default {
  data () {
    return {
      prefixCls: prefixCls,
      scale: 1,
      childrenWidth: 0,
      isSlotShow: false
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.shape}`,
        `${prefixCls}-${this.size}`,
        {
          [`${prefixCls}-image`]: !!this.src,
          [`${prefixCls}-icon`]: !!this.icon
        }
      ]
    },
    childrenStyle () {
      let style = {}
      if (this.isSlotShow) {
        style = {
          msTransform: `scale(${this.scale})`,
          WebkitTransform: `scale(${this.scale})`,
          transform: `scale(${this.scale})`,
          position: 'absolute',
          display: 'inline-block',
          left: `calc(50% - ${Math.round(this.childrenWidth / 2)}px)`
        }
      }
      return style
    }
  },
  props: {
    shape: {
      validator (value) {
        return oneOf(value, ['circle', 'square'])
      },
      default: 'circle',
      type: String
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'middle'])
      },
      default: 'middle',
      type: String
    },
    src: String,
    icon: String
  },
  methods: {
    setScale () {
      this.isSlotShow = !this.src && !this.icon
      if (this.$refs.children) {
        // set children width again to make slot centered
        this.childrenWidth = this.$refs.children.offsetWidth
        const avatarWidth = this.$el.getBoundingClientRect().width
        // add 4px gap for each side to get better performance
        if (avatarWidth - 8 < this.childrenWidth) {
          this.scale = (avatarWidth - 8) / this.childrenWidth
        } else {
          this.scale = 1
        }
      }
    }
  },
  mounted () {
    this.setScale()
  },
  updated () {
    this.setScale()
  }
}
</script>

<style lang="less" scoped>
.blog-avatar {
  display: inline-block;
  text-align: center;
  background: #ccc;
  color: #fff;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;

  & > * {
    line-height: 32px;
  }

  &-icon {
    font-size: 18px;
  }

  &-image {
    background: 0 0;
    img {
      height: 100%;
    }
  }

  &-large {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
  }

  &-small {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
  }

  &-square {
    border-radius: 4px;
  }

  &-circle {
    border-radius: 50%;
  }
}
</style>
