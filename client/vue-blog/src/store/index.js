import Vue from 'vue'
import Vuex from 'vuex'
import header from './modules/header'
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
    showLeftSide: true,
    showRigthSide: true,
    headerover: false
  },
  mutations: {
    emitHeaderOver (state) {
      state.headerover = true
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
    }
  },
  actions: {

  }
})
