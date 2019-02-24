// export default {
//   state: {},
//   mutations: {},
//   actions: {},
//   getters: {

//   }
// }

export default {
  namespaced: true,

  state: {
    showAnimationBeforeEnter: true, // 进入界面是否显示动画过程
    isAnimateOver: false, // 开头动画是否完成
    isSkipAnimate: false, // 是否跳过动画
    isStepIntoMC: false, // 是否到MC步骤
    isStepIntoBG: false // 是否进入背景页
  },
  mutations: {
    doneAnimate (state) {
      state.isAnimateOver = true
    },
    skipAnimate (state) {
      state.isAnimateOver = true
      state.isStepIntoBG = true
      state.isSkipAnimate = true
    },
    animateMC (state) {
      state.stepIntoMC = true
    },
    stepIntoBGWall (state) {
      state.stepIntoBG = true
    },
    doneWelcome (state) {
      state.showAnimationBeforeEnter = false
    }
  },
  actions: {},
  getters: {

  }
}
