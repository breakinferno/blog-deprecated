import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CommonComponents from './components/Common'
import Directives from './directives'
import './plugins/element.js'
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'

import {
  Editor
} from '@toast-ui/vue-editor'

import {
  createProvider
} from './vue-apollo'
// import './registerServiceWorker'
// console.log(BlogComponents)

Vue.config.productionTip = false

// 一些公共组件
for (let comp of Object.keys(CommonComponents)) {
  Vue.component(comp, CommonComponents[comp])
}
// 一些公共指令
for (let dir of Object.keys(Directives)) {
  Vue.directive(dir, Directives[dir])
}

Vue.use(Editor)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

// console.log(process.env)
