<template>
  <div id="background-wrap"
       :class="{fade: faded}">
    <pre contenteditable
         ref="styleEl"
         id="style-text"
         :class="{open: openDoor}"
         @input="styleInput"></pre>
    <pre id="work-text"
         ref="workEl"
         :class="{open: openDoor}"
         @dblclick="flip()"></pre>
    <div id="background-control">
      <span v-show="paused"
            @click.prevent="resumeAnimation">
        <icon-svg icon-class="kaishi"></icon-svg>
      </span>
      <span v-show="!paused"
            @click.prevent="pauseAnimation">
        <icon-svg icon-class="zanting"></icon-svg>
      </span>
      <span @click.prevent="skipAnimation">
        <icon-svg icon-class="tiaoguo"></icon-svg>
      </span>
    </div>
    <mc-character :ready="done"
                  @moveEnd="handleMoveEnd"
                  @openDoor="handleOpenDoor">
    </mc-character>
  </div>
</template>
<script>
import McCharacter from '../Character'
import 'classlist-polyfill'
import Markdown from 'markdown'
import replaceURLs from './lib/replaceUrl'
import writeChar, {
  writeSimpleChar,
  handleChar
} from './lib/writeChar'
import getPrefix from './lib/getPrefix'
import workText from './txt/bg-txt/work.txt'
import preStyles from './txt/bg-stylecss/pre.txt'
// const workText = require('raw-loader!../assets/bg-txt/work.txt')
// const preStyles = require('raw-loader!../assets/bg-stylecss/pre.txt')
const md = Markdown.markdown.toHTML
let styleText = [0, 1, 2, 3].map(function (i) {
  return require('./txt/bg-stylecss/style' + i + '.txt')
})

// polyfill
Promise.delay = Promise.delay || function (time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time) // 记得setTimeout是4ms-16ms不等
  })
}
let browserPrefix
let endOfSentence = /[.?!]\s$/
let comma = /\D[,]\s$/
let endOfBlock = /[^/]\n\n$/

const style = document.getElementById('style-tag')

export default {
  props: ['forceSkip'],
  data () {
    return {
      paused: false,
      isSkip: false,
      speed: 0,
      done: false,
      faded: false,
      openDoor: false
    }
  },
  components: {
    McCharacter
  },
  mounted () {
    console.log('mounted!! start animate~~')
    this.init()
  },
  watch: {
    done (n, o) {
      if (n) {
        // if (document.querySelector('.post-style')) {
        //   return
        // }
        // let styles = document.querySelectorAll('head style')
        // let postStyleEl = document.createElement('style')
        // postStyleEl.textContent = '* { ' + browserPrefix + 'transition: none; }'
        // postStyleEl.classList.add('post-style')
        // // 结束就去除所有过渡
        // document.head.insertBefore(postStyleEl, styles[styles.length - 1])
      }
    }
  },
  methods: {
    init () {
      console.log('start animate...')
      this.getBrowserPrefix()
      this.preInit()
      this.startAnimation()
    },
    preInit () {
      if (document.querySelector('.pre-style')) {
        return
      }
      let preStyleEl = document.createElement('style')
      preStyleEl.textContent = preStyles
      preStyleEl.classList.add('pre-style')
      document.head.insertBefore(preStyleEl, document.getElementsByTagName('style')[0])
    },
    pauseAnimation () {
      this.paused = true
      console.log('paused!')
    },
    resumeAnimation () {
      this.paused = false
      console.log('resume!')
    },
    skipAnimation () {
      this.isSkip = true
      // console.log('skip')
    },
    styleInput () {
      style.textContent = this.$refs.styleEl.textContent
    },
    async  startAnimation () {
      try {
        await this.writeTo(this.$refs.styleEl, styleText[0], 0, this.speed, true, 1)
        // markdown 编辑区
        await this.writeTo(this.$refs.workEl, workText, 0, this.speed, false, 1)
        // markdown 样式
        await this.writeTo(this.$refs.styleEl, styleText[1], 0, this.speed, true, 1)
        // markdown显示区
        this.createWorkBox()
        await new Promise(resolve => setTimeout(() => {
          this.flip()
          resolve()
        }, 200))
        await this.writeTo(this.$refs.styleEl, styleText[2], 0, this.speed, true, 1)
        await this.writeTo(this.$refs.styleEl, styleText[3], 0, this.speed, true, 1)
        console.log('animate end')
        this.done = true
        // 去除过度
      } catch (e) {
        if (e.message === 'SKIP IT') {
          this.surprisinglyShortAttentionSpan()
        } else {
          throw e
        }
      }
    },
    flip () {
      this.$refs.workEl.classList.toggle('flipped')
    },
    getBrowserPrefix () {
      browserPrefix = getPrefix()
      styleText = styleText.map(function (text) {
        return text.replace(/-webkit-/g, browserPrefix)
      })
    },
    createWorkBox () {
      if (this.$refs.workEl.classList.contains('flipped')) return
      // 添加内容
      this.$refs.workEl.innerHTML = '<div class="text" contenteditable>' + replaceURLs(workText) + '</div>' +
        '<div class="md">' + replaceURLs(md(workText)) + '<div>'
    },
    async handleMoveEnd () {
      this.fade()
      await Promise.delay(1500)
      this.$emit('animateEnd')
    },
    handleOpenDoor () {
      this.open()
    },
    // 设置消失
    fade () {
      this.faded = true
    },
    open () {
      this.openDoor = true
    },
    // reWriteTo(){
    //   if (this.skip) {
    //     console.warn('Skip!!')
    //     await this.surprisinglyShortAttentionSpan()
    //     return
    //   }
    //   if (index < message.length) {
    //     let thisInterval = interval
    //     let thisSlice = message.slice(index - 2, index + 1)
    //     if (comma.test(thisSlice)) thisInterval = interval * 30
    //     if (endOfBlock.test(thisSlice)) thisInterval = interval * 50
    //     if (endOfSentence.test(thisSlice)) thisInterval = interval * 70
    //     return new Promise()
    //   }
    // },
    async  writeTo (el, message, index, interval, mirrorToStyle, charsPerInterval) {
      if (this.skip) {
        // console.warn('Skip!!')
        await this.surprisinglyShortAttentionSpan()
        return
      }
      // 间隔
      let chars = message.slice(index, index + charsPerInterval)
      index += charsPerInterval

      el.scrollTop = el.scrollHeight
      // 是否写css样式
      if (mirrorToStyle) {
        writeChar(el, chars, style)
      } else {
        writeSimpleChar(el, chars)
      }

      if (index < message.length) {
        let thisInterval = interval
        let thisSlice = message.slice(index - 2, index + 1)
        if (comma.test(thisSlice)) thisInterval = interval * 30
        if (endOfBlock.test(thisSlice)) thisInterval = interval * 50
        if (endOfSentence.test(thisSlice)) thisInterval = interval * 70
        // 暂停就一直等着 并且在这里才进行切换，
        do {
          // console.log('test: ' + this.paused)
          await Promise.delay(thisInterval)
        } while (this.paused)
        // debugger

        return this.writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval)
      }
    },
    async  surprisinglyShortAttentionSpan () {
      if (this.done) return
      let txt = styleText.join('\n')

      style.textContent = '#work-text * { ' + browserPrefix + 'transition: none; }'

      style.textContent += txt
      let styleHTML = ''
      for (let i = 0; i < txt.length; i++) {
        styleHTML = handleChar(styleHTML, txt[i])
      }
      this.$refs.styleEl.innerHTML = styleHTML
      this.createWorkBox()

      let start = Date.now()
      while (Date.now() - 1000 > start) {
        this.$refs.workEl.scrollTop = Infinity
        this.$refs.styleEl.scrollTop = Infinity
        await Promise.delay(16)
      }
      this.done = true
    }
  },
  computed: {
    skip () {
      return this.isSkip || this.forceSkip
    }
  }
}
</script>
<style lang="less" scoped>
#background-wrap {
  text-align: left;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  perspective: 2400px;
  .fillAll();
  &.fade {
    animation: getIntoRoom 1.5s both;
  }

  pre {
    max-width: 50%;
    word-break: break-word;
    white-space: pre-wrap;
    box-sizing: border-box;
    height: 100%;
  }
  pre.open {
    transition: all 3s linear;
  }

  #style-text.open {
    transform: translateX(100%) rotateY(-150deg);
  }

  #work-text.open {
    transform: rotateY(150deg);
  }

  #background-control {
    position: absolute;
    bottom: 30px;
    left: 20px;
    height: 32px;
    display: flex;
    width: 100px;
    justify-content: space-around;
    span {
      font-size: 24px;
      cursor: pointer;
      display: inline-block;
      svg {
        width: 32px;
        height: 32px;
      }
    }
  }

  @keyframes getIntoRoom {
    from {
      transform: scale(1) translateZ(0);
      opacity: 1;
    }
    to {
      transform: scale(1.5) translateZ(40px);
      opacity: 0;
    }
  }
}
</style>
