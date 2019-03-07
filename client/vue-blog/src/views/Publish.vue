<template>
    <div class="publish" :style="{height: `${height -220}px`}">
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
// const methodNames = ['focus', 'getValue', 'getHtml', 'getSelectedText', 'reset', 'moveCursorToStart', 'moveCursorToEnd']
const initText = 'Say what you want to say...<h3>You can also write html!!!</h3>'
const noop = () => {}
const onEditorFocus = function () {
  if (this.editorText === initText) {
    this.editorText = ''
  }
}
const onEditorBlur = noop
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
      height: document.documentElement.clientHeight || window.innerHeight,
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
      editorPreviewStyle: 'vertical'
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
    }
  }),
  mounted () {
    window.addEventListener('resize', () => {
      this.height = document.documentElement.clientHeight || window.innerHeight
    }, false)
  }
}
</script>
<style lang="less" scoped>
.publish{
    // position: fixed;
    // top: 50px;
    // left: 65px;
    // right: 65px;
    // bottom: 70px;
    display: flex;
    flex-direction: column;
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
}
</style>
