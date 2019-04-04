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
import './Icons'
import Config from '../config'
import memory from './utils/localstorage'
import {
  Editor,
  Viewer
} from '@toast-ui/vue-editor'
import { mapMutations } from 'vuex'

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

Vue.component('viewer', Viewer)
Vue.component('editor', Editor)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
  methods: {
    ...mapMutations(['login', 'logout']),
    checkLogin () {
      let baseInfo = JSON.parse(memory.getLocalStorage(Config.baseDataName))
      if (!baseInfo) {
        this.logout()
        // this.$router.push('/login')
      } else {
        // 是否过期
        if (+baseInfo.duration > Date.now()) {
          this.login()
        } else {
          this.logout()
        }
      }
    }
  }
}).$mount('#app')

// console.log(process.env)
