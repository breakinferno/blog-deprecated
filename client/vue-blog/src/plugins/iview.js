import Vue from 'vue'
import {
  Button,
  Layout,
  Content,
  Sider,
  Card,
  Header,
  Footer,
  Message
} from 'iview'

// Vue.component('Button', Button)

import 'iview/dist/styles/iview.css'

const tModules = {
  Button,
  Layout,
  Content,
  Sider,
  Card,
  Header,
  Footer,
  Message
}

for (let module in tModules) {
  Vue.component(module, tModules[module])
}
