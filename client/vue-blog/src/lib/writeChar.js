let styleBuffer = ''
const fullTextStorage = {}

/**
 * 写字符，可添加样式
 * @param {*} el      dom对象
 * @param {*} char    字符
 * @param {*} style   样式
 */
export default function writeChar (el, char, style) {
  // 缓存现在的文案，不然又要从dom获取
  let fullText = fullTextStorage[el.id]
  if (!fullText) fullText = fullTextStorage[el.id] = el.innerHTML

  fullText = handleChar(fullText, char)
  // 写dom 以后考虑又没有更好的方法
  el.innerHTML = fullTextStorage[el.id] = fullText

  styleBuffer += char
  if (char === ';') {
    style.textContent += styleBuffer
    styleBuffer = ''
  }
};

/**
 *简单的写字符串
 * @param {*} el          目标dom
 * @param {*} char        字符
 */
export function writeSimpleChar (el, char) {
  el.innerHTML += char
};
// 是否
let openComment = false
// 注释正则 /*
const commentRegex = /(\/\*(?:[^](?!\/\*))*\*)$/
// style 的key
const keyRegex = /([a-zA-Z- ^\n]*)$/
// style 的value
const valueRegex = /([^:]*)$/
// 选择器
const selectorRegex = /(.*)$/
// px
const pxRegex = /\dp/ // dpx
const pxRegex2 = /p$/ // px

/**
 *字符处理
 * @param {*} fullText  当前所有的字符
 * @param {*} char      字符
 * @returns
 */
export function handleChar (fullText, char) {
  if (openComment && char !== '/') { // 继续处理comment
    fullText += char
  } else if (char === '/' && openComment === false) { // 开始处理comment
    openComment = true
    fullText += char
  } else if (char === '/' && fullText.slice(-1) === '*' && openComment === true) { // 结束comment
    openComment = false
    // dom
    fullText = fullText.replace(commentRegex, '<span class="comment">$1/</span>')
  } else if (char === ':') { // key的处理
    fullText = fullText.replace(keyRegex, '<span class="key">$1</span>:')
  } else if (char === ';') { // value的处理
    fullText = fullText.replace(valueRegex, '<span class="value">$1</span>;')
  } else if (char === '{') { // selector的处理
    fullText = fullText.replace(selectorRegex, '<span class="selector">$1</span>{')
  } else if (char === 'x' && pxRegex.test(fullText.slice(-2))) {
    fullText = fullText.replace(pxRegex2, '<span class="value px">px</span>')
  } else {
    fullText += char
  }
  return fullText
}
