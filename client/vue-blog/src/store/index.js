import Vue from 'vue'
import Vuex from 'vuex'
import header from './modules/header'
import Config from '../../config'
import memory from '../utils/localstorage'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    header: header
  },
  state: {
    layout: {
      leftSide: [],
      main: '',
      rightSide: []
    },
    isLogin: false,
    showLeftSide: true,
    showRigthSide: true,
    headerover: false,
    showHeader: false
  },
  mutations: {
    triggerHeader (state, flag) {
      state.showHeader = flag || false
    },
    hideLeftSide (state) {
      state.showLeftSide = false
    },
    hideRightSide (state) {
      state.showRightSide = false
    },
    hideBothSides (state) {
      state.showLeftSide = false
      state.showRightSide = false
    },
    showLeftSide (state) {
      state.showLeftSide = true
    },
    showRightSide (state) {
      state.showRightSide = true
    },
    showBothSides (state) {
      state.showLeftSide = false
      state.showRightSide = true
    },
    changeLayout (state, layout) {
      state.layout = { ...state.layout, ...layout }
    },
    hideAnimationPage (state) {
      state.showAnimationBeforeEnter = false
    },
    login (state) {
      state.isLogin = true
    },
    logout (state) {
      state.isLogin = false
      memory.removeItem(Config.baseDataName)
    }
  },
  actions: {

  }
})
