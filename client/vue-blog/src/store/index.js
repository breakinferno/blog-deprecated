import Vue from 'vue'
import Vuex from 'vuex'
import header from './modules/header'
import Config from '../../config'
import memory from '../utils/localstorage'
import { get } from '../utils/request'
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
    loadings: {
      tagsLoading: true,
      categoryLoading: true,
      postLoading: true
    },
    isLogin: false,
    showLeftSide: true,
    showRigthSide: true,
    headerover: false,
    showHeader: false,
    categories: [],
    tags: []
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
    },
    setCategories (state, categories) {
      state.categories = categories
    },
    setTags (state, tags) {
      state.tags = tags
    },
    showLoading (state, name) {
      name = `${name}Loading`
      state.loadings[name] && (state.loadings[name] = true)
    },
    hideLoading (state, name) {
      name = `${name}Loading`
      state.loadings[name] && (state.loadings[name] = false)
    }
  },
  actions: {
    getCategoriesReq ({ commit }) {
      get('/categories').then(res => {
        commit('setCategories', res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    getTagsReq ({ commit }) {
      get('/tags').then(res => {
        console.log(res)
        commit('setTags', res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
