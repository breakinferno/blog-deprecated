import 'classlist-polyfill'
import Markdown from 'markdown'
import replaceURLs from './replaceUrl'
import writeChar, {
  writeSimpleChar,
  handleChar
} from './writeChar'
import getPrefix from './getPrefix'
// import workText from '../assets/bg-txt/work.txt'
// import preStyles from '../assets/bg-stylecss/pre.css'
import workText from '../assets/bg-txt/work.txt'
import preStyles from '../assets/bg-stylecss/pre.txt'
// const workText = require('raw-loader!../assets/bg-txt/work.txt')
// const preStyles = require('raw-loader!../assets/bg-stylecss/pre.txt')
const md = Markdown.markdown.toHTML
let styleText = [0, 1, 2, 3].map(function (i) {
  return require('../assets/bg-stylecss/style' + i + '.txt')
})

// polyfill
Promise.delay = Promise.delay || function (time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time) // 记得setTimeout是4ms-16ms不等
  })
}

const isDev = window.location.hostname === 'localhost'
const speed = isDev ? 0 : 16
let style, styleEl, workEl, skipAnimationEl, pauseEl
let animationSkipped = false

let done = false

let paused = false
let browserPrefix

// Wait for load to get started.
export default function () {
  console.log('start animate...')
  getBrowserPrefix()
  getEls()
  createEventHandlers()
  startAnimation()
}

async function startAnimation () {
  try {
    await writeTo(styleEl, styleText[0], 0, speed, true, 1)
    debugger
    await writeTo(workEl, workText, 0, speed, false, 1)
    await writeTo(styleEl, styleText[1], 0, speed, true, 1)
    // 新建一个markdown
    createWorkBox()
    await Promise.delay(1000)
    await writeTo(styleEl, styleText[2], 0, speed, true, 1)
    await writeTo(styleEl, styleText[3], 0, speed, true, 1)
    console.log('animate end')
  } catch (e) {
    if (e.message === 'SKIP IT') {
      surprisinglyShortAttentionSpan()
    } else {
      throw e
    }
  }
}

async function surprisinglyShortAttentionSpan () {
  if (done) return
  done = true
  let txt = styleText.join('\n')

  // The work-text animations are rough
  style.textContent = '#work-text * { ' + browserPrefix + 'transition: none; }'
  style.textContent += txt
  let styleHTML = ''
  for (let i = 0; i < txt.length; i++) {
    styleHTML = handleChar(styleHTML, txt[i])
  }
  styleEl.innerHTML = styleHTML
  createWorkBox()

  // There's a bit of a scroll problem with this thing
  let start = Date.now()
  while (Date.now() - 1000 > start) {
    workEl.scrollTop = Infinity
    styleEl.scrollTop = Infinity
    await Promise.delay(16)
  }
}

/**
 * Helpers
 */

let endOfSentence = /[\.\?\!]\s$/
let comma = /\D[\,]\s$/
let endOfBlock = /[^\/]\n\n$/

/**
 *写dom内容
 *
 * @param {*} el                  dom对象
 * @param {*} message             字符串
 * @param {*} index               从第几个字符开始
 * @param {*} interval            延迟时间
 * @param {*} mirrorToStyle
 * @param {*} charsPerInterval    字符步长
 * @returns
 */
async function writeTo (el, message, index, interval, mirrorToStyle, charsPerInterval) {
  if (animationSkipped) {
    console.warn('Skip!!')
  }
  // 间隔
  let chars = message.slice(index, index + charsPerInterval)
  index += charsPerInterval

  el.scrollTop = el.scrollHeight

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

    do {
      await Promise.delay(thisInterval)
    } while (paused)

    return writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval)
  }
}

function getBrowserPrefix () {
  browserPrefix = getPrefix()
  styleText = styleText.map(function (text) {
    return text.replace(/-webkit-/g, browserPrefix)
  })
}

function getEls () {
  // We're cheating a bit on styles.
  let preStyleEl = document.createElement('style')
  preStyleEl.textContent = preStyles
  document.head.insertBefore(preStyleEl, document.getElementsByTagName('style')[0])

  // 新增的样式dom
  style = document.getElementById('style-tag')
  // 可输入区域dom
  styleEl = document.getElementById('style-text')
  //
  workEl = document.getElementById('work-text')
  // 跳过dom
  //   skipAnimationEl = document.getElementById('skip-animation')
  // 暂停dom
  //   pauseEl = document.getElementById('pause-resume')
}

// 事件处理
function createEventHandlers () {
  // 输入样式，更新
  styleEl && styleEl.addEventListener('input', function () {
    style.textContent = styleEl.textContent
  })

  // 跳过动画
  skipAnimationEl && skipAnimationEl.addEventListener('click', function (e) {
    e.preventDefault()
    animationSkipped = true
  })

  // 暂停
  pauseEl && pauseEl.addEventListener('click', function (e) {
    e.preventDefault()
    if (paused) {
      pauseEl.textContent = 'Pause ||'
      paused = false
    } else {
      pauseEl.textContent = 'Resume >>'
      paused = true
    }
  })
}

/**
 * 新建
 */
function createWorkBox () {
  if (workEl.classList.contains('flipped')) return
  workEl.innerHTML = '<div class="text">' + replaceURLs(workText) + '</div>' +
    '<div class="md">' + replaceURLs(md(workText)) + '<div>'

  workEl.classList.add('flipped')
  workEl.scrollTop = 9999

  // 翻转
  let flipping = 0
  require('mouse-wheel')(workEl, async function (dx, dy) {
    if (flipping) return
    let flipped = workEl.classList.contains('flipped')
    let half = (workEl.scrollHeight - workEl.clientHeight) / 2
    let pastHalf = flipped ? workEl.scrollTop < half : workEl.scrollTop > half

    if (pastHalf) {
      workEl.classList.toggle('flipped')
      flipping = true
      await Promise.delay(500)
      workEl.scrollTop = flipped ? 0 : 9999
      flipping = false
    }

    workEl.scrollTop += (dy * (flipped ? -1 : 1))
  }, true)
}
