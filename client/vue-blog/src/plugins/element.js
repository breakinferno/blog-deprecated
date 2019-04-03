import Vue from 'vue'
import {
  Button,
  Card,
  Header,
  Message,
  Icon,
  Container,
  Aside,
  Footer,
  Main,
  Loading,
  Menu,
  MenuItem,
  MessageBox,
  Tooltip,
  Autocomplete,
  Form,
  FormItem,
  Dialog,
  Input
} from 'element-ui'

const tModules = [
  Button,
  Card,
  Header,
  Icon,
  Container,
  Aside,
  Footer,
  Main,
  Menu,
  MenuItem,
  Tooltip,
  Autocomplete,
  Form,
  FormItem,
  Dialog,
  Input
]

tModules.forEach((m) => {
  // Vue.use(m) // 这样会自动弹出message 或者 notification
  Vue.component(m.name, m)
})

Vue.use(Loading.directive) // loading不能使用上面方式注册 坑
Vue.prototype.$loading = Loading.service

const MsgBox = MessageBox
Vue.prototype.$msgbox = MsgBox
Vue.prototype.$alert = MsgBox.alert
Vue.prototype.$confirm = MsgBox.confirm
Vue.prototype.$prompt = MsgBox.prompt

const notify = Notification
Vue.prototype.$notify = notify
const message = Message
Vue.prototype.$message = message
