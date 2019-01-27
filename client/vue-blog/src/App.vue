<template>
  <div id="app"
       v-scroll="handleScroll">
    <el-container>
      <transition>
        <el-header :class="{modify}">
          <blog-header ref="header"
                       @modify="handleModify"></blog-header>
        </el-header>
      </transition>
      <div class="wrapper">
        <el-main>
          <el-container>
            <Container orientation="horizontal"
                       @drop="onColumnDrop($event)"
                       drag-handle-selector=".drag-handler"
                       @drag-start="dragStart"
                       class="el-container">
              <!-- <Draggable key="introduction"> -->
              <el-aside class="left-aside" v-show="showLeftSide">
                <!-- <introduction></introduction> -->
                <div :is="scene.children[0].component"></div>
              </el-aside>
              <!-- </Draggable> -->
              <div class="content" :class="{'fullScreen': !showLeftSide && !showRightSide}">
                <router-view></router-view>
              </div>
              <!-- <Draggable key="test"> -->
              <el-aside class="right-aside" v-show="showRightSide">
                <!-- <panel></panel> -->
                <div :is="scene.children[1].component"></div>
              </el-aside>
              <!-- </Draggable> -->
            </Container>

          </el-container>
        </el-main>
      </div>
      <el-footer>
        <blog-footer></blog-footer>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import Panel from '@/components/Common/Panel'
import BlogHeader from '@/components/Header'
import BlogFooter from '@/components/Footer'
import Introduction from '@/components/Introduction'
import { applyDrag } from '@/utils/dnd'
import { mapState } from 'vuex'

const draggableComp = [{
  id: `introduction`,
  type: 'container',
  component: 'introduction'
}, {
  id: 'test',
  type: 'container',
  component: 'panel'
}
]
export default {
  name: 'app',
  data () {
    return {
      modify: false,
      scene: {
        type: 'container',
        children: draggableComp
      }
    }
  },
  computed: {
    ...mapState(['layout', 'showLeftSide', 'showRightSide'])
  },
  components: {
    // ApolloExample
    BlogHeader,
    BlogFooter,
    Panel,
    Introduction,
    Container,
    Draggable
  },
  methods: {
    onColumnDrop (dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
      console.log(this.scene.children)
    },
    dragStart () {
      console.log('drag started')
    },
    // onCardDrop (columnId, dropResult) {
    //   if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    //     const scene = Object.assign({}, this.scene)
    //     const column = scene.children.filter(p => p.id === columnId)[0]
    //     const columnIndex = scene.children.indexOf(column)
    //     const newColumn = Object.assign({}, column)
    //     newColumn.children = applyDrag(newColumn.children, dropResult)
    //     scene.children.splice(columnIndex, 1, newColumn)
    //     this.scene = scene
    //   }
    // },

    handleModify () {
      this.modify = true
    },
    handleScroll (evt, el, binding, last, cb) {
      if (window.scrollY - last > 50) {
        // 唤醒header
        // this.awake = true
        this.$refs.header.handleTimeout()
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        cb && cb(window.scrollY)
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;

  .wrapper {
    width: 100%;
    background-image: url('./assets/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    padding-top: 30px;
    min-height: 100%;
    box-sizing: border-box;
    aside {
      overflow: hidden;
    }
    .el-container {
      justify-content: center;
    }
    .content {
      max-width: 900px;
      // min-width: 600px;
      flex: 1;
      margin: 0 45px;
      background: #fbfbfb;
      white-space: normal;
    }
    .content.fullScreen{
      max-width: none;
    }
  }
  .el-main {
    overflow: visible;
  }
  .el-header {
    padding: 0px;
    height: 100% !important;
    transition: all 1.5s ease;
    z-index: 1;
    &.modify {
      height: 60px !important;
      position: fixed;
      width: 100%;
      // z-index: -1;
    }
  }
  .el-footer {
    height: 0 !important;
    background: none;
  }
  .el-aside {
    background: white;
    align-self: self-start;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .el-aside.left-aside {
    width: 200px !important;
  }
  & > .el-container {
    // position: absolute;
    // top: 0px;
    // left: 0px;
    // width: 100%;
    // // padding-top: 60px;
    // bottom: 0px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // min-width: 1220px;
  }
}
</style>
