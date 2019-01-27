<template>
    <div class="publish" v-if="visible">
        <el-tooltip placement="top">
          <div slot="content">多行信息<br/>第二行信息</div>
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
const eventListenr = [
  'onEditorLoad',
  'onEditorFocus',
  'onEditorBlur',
  'onEditorChange',
  'onEditorStateChange'
].reduce((methods, methodName) => {
  methods[methodName] = function () {
    // console.log(`[editor] ${methodName}`)
  }
  return methods
}, {})
export default {
  mounted () {
    this.hideBothSides()
  },
  data () {
    return {
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
      editorText: 'This is initialValue.',
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
    visible () {
      return this.$store.state.headerover
    }
  },
  methods: Object.assign(eventListenr, {
    ...mapMutations([
      'hideLeftSide',
      'hideRightSide',
      'hideBothSides'
    ]),
    methodInvoke (methodName) {
      this.message = this.$refs.tuiEditor.invoke(methodName)
    },
    // changeHtml () {
    //   this.editorHtml = '<h1>Hi</h1>'
    // },
    changePreviewStyle () {
      this.editorPreviewStyle = this.editorPreviewStyle === 'tab' ? 'vertical' : 'tab'
    }
  })
}
</script>
<style lang="less" scoped>
.publish{
    position: fixed;
    z-index: 99;
    top: 50px;
    left: 65px;
    right: 65px;
    bottom: 70px;
  .tui-editor-contents h1{
    border-bottom: 0px !important;
  }

  & /deep/ .te-preview{
    background: #fbfbfb !important;
  }
}
</style>
