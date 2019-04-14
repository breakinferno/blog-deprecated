<template>
    <div class="publish">
        <blog-header></blog-header>
        <div class="title-wrapper">
          <panel @publish="submit" v-show="readyToPublish"></panel>
          <p id="title"><input @focus="titleFocus = true" @blur="titleFocus = false" id="title-input" v-model="title" /></p>
          <label for="title-input" :class="{focus: titleFocus || title}"></label>
          <span ref="publishBtn" class="publish-btn" @click="handlePublishBtnClick">发表</span>
        </div>
        <el-tooltip placement="top end">
          <div slot="content">dbclick here to change preview style!</div>
          <editor ref="tuiEditor"
                  v-model="editorText"
                  height="100%"
                  style="min-height: 500px"
                  :options="editorOptions"
                  :html="editorHtml"
                  :mode="editorMode"
                  :previewStyle="editorPreviewStyle"
                  @load="onEditorLoad"
                  @focus="onEditorFocus"
                  @blur="onEditorBlur"
                  @change="onEditorChange"
                  @stateChange="onEditorStateChange" />
        </el-tooltip>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import BlogHeader from '@/components/Header'
import Panel from './Panel'
import { post } from '../../utils/request.js'
// const methodNames = ['focus', 'getValue', 'getHtml', 'getSelectedText', 'reset', 'moveCursorToStart', 'moveCursorToEnd']
const initText = 'Say what you want to say...<h3>You can also write html!!!</h3>'
const noop = () => {}
const onEditorFocus = function () {
  if (this.editorText === initText) {
    this.editorText = ''
  }
  if (this.draftTimer) {
    return
  }
  this.draftTimer = setInterval(() => {
    if (this.editorText) {
      this.updateDraft()
    }
  }, 3000)
}
const onEditorBlur = function () {
  if (this.draftTimer) {
    clearInterval(this.draftTimer)
    this.draftTimer = null
  }
  this.updateDraft()
}
const onEditorChange = noop
const onEditorStateChange = noop

const onEditorLoad = function () {
  let target = document.querySelector('.tui-editor-defaultUI-toolbar')
  if (target) {
    target.addEventListener('dblclick', e => this.changePreviewStyle())
  }
}
const eventListenr = {
  onEditorBlur,
  onEditorChange,
  onEditorFocus,
  onEditorLoad,
  onEditorStateChange
}

export default {
  data () {
    return {
      readyToPublish: false,
      height: document.documentElement.clientHeight || window.innerHeight,
      titleFocus: false,
      title: '',
      isHide: false,
      tag: '',
      category: '',
      star: '0',
      message: '',
      methodNames: [
        'focus',
        'getValue',
        'getHtml',
        'getSelectedText',
        'moveCursorToStart',
        'moveCursorToEnd',
        'reset'
      ],
      editorText: initText,
      editorOptions: {
        minHeight: '500px',
        useCommandShortcut: true,
        hideModeSwitch: false,
        usageStatistics: false,
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'task',
          'indent',
          'outdent',
          'divider',
          'table',
          'image',
          'link',
          'divider',
          'code',
          'codeblock'
        ]
      },
      editorHtml: '',
      editorMode: 'markdown',
      editorVisible: true,
      editorPreviewStyle: 'vertical',
      draftTimer: null
    }
  },
  computed: {

  },
  created () {
    // this.hideBothSides()
  },
  methods: Object.assign(eventListenr, {
    ...mapMutations([
      'hideLeftSide',
      'hideRightSide',
      'hideBothSides'
    ]),
    methodInvoke (methodName) {
      return this.$refs.tuiEditor.invoke(methodName)
    },
    changePreviewStyle () {
      this.editorPreviewStyle = this.editorPreviewStyle === 'tab' ? 'vertical' : 'tab'
    },
    querySearchAsync (queryString, cb) {
      let restaurants = [1, 2, 3, 4].map(v => {
        return { value: '' + v }
      })
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 100)
    },
    createStateFilter (queryString) {
      return (state) => {
        return ((state.value + '').toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelectTag (item) {
      console.log(item)
    },
    handleSelectCategory (item) {
      console.log(item)
    },
    handleSelectStar (item) {
      console.log(item)
    },
    handlePublishBtnClick (btn) {
      this.readyToPublish = !this.readyToPublish
    },
    submit ({ category, tags }) {
      console.log(category)
      console.log(tags)
      //   return
      if (this.title && this.editorText) {
        // 请求
        post('/posts', {
          title: this.title,
          category: category,
          tags: tags,
          content: this.editorText
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      } else {
        const h = this.$createElement
        this.$notify({
          title: '标题名称',
          duration: 300,
          message: h('i', { style: 'color: teal' }, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
        })
      }
    },
    updateDraft () {
      console.log('update draft')
    }
  }),
  mounted () {
    window.addEventListener('resize', () => {
      // this.height = document.documentElement.clientHeight || window.innerHeight
    }, false)
  },
  components: {
    BlogHeader,
    Panel
  }
}
</script>
<style lang="less" scoped>
.publish{
    // position: fixed;
    // top: 150px;
    // left: 65px;
    // right: 65px;
    // bottom: 70px;
    display: flex;
    flex-direction: column;
    opacity: 0.7;
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: inherit;
    .publish-header{
      margin-bottom: 20px;
      &.hide{
        display: none;
        margin-bottom: 0px;
      }
      .info{
        display: flex;
      }
    }
    & /deep/ .el-tooltip{
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      padding: 100px;
      padding-bottom: 40px;
      .tui-editor-defaultUI{
            height: 100%;
            flex-grow: 1;
      }
    }
    .tui-editor-contents h1{
      border-bottom: 0px !important;
    }

    & /deep/ .te-preview{
      background: #fbfbfb !important;
    }

    #blog-header.timeout{
      transform: none;
    }

    .title-wrapper{
        position: fixed;
        top: 60px;
        width: 100%;
        padding: 0 100px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        z-index: 1;
        .publish-btn{
            position: absolute;
            right: 165px;
            border: 1px solid gray;
            padding: 5px;
            border-radius: 5px;
            font-size: 14px;
            background: #c3d3ef;
            white-space: nowrap;
            cursor: pointer;
            user-select: none;
        }
    }
    #title{
      display: inline-block;
      vertical-align: top;
      height: 40px;
      outline: none;
      border: none;
      padding: 0px;
      width: 100%;
      padding-left: 20px;
      box-sizing: border-box;
      background: none;
      position: relative;
      &::before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: red;
        position: absolute;
        left: 0px;
        bottom: 0px;
        transition: width 1s;
      }
      & + label{
        top: 2px;
        display: inline-block;
        height: 36px;
        outline: none;
        width: 36px;
        border-radius: 50%;
        border: none;
        padding: 0px;
        background: red;
        transform: scale(1) translateX(0) rotateZ(0deg);
        transition: all 2.5s ease;
        position: absolute;
        left: 100px;
        transform-origin: center center;
        cursor: pointer;
        &.focus{
            transform: translateX(300px);
        }
      }

      & > input {
        border: none;
        outline: none;
        height: 100%;
        background: none;
        font-size: 22px;
        font-weight: bold;
      }
      &>input:focus + label{
        transform: scale(0);
        // left: 300px;
      }
    }
}
</style>
