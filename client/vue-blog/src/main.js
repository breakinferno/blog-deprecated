import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BlogComponents from './components'
import './plugins/element.js'

// import './registerServiceWorker'
// console.log(BlogComponents)

Vue.config.productionTip = false

// 一些公共组件
for (let comp of Object.keys(BlogComponents)) {
  Vue.component(comp, BlogComponents[comp])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// console.log(process.env)
