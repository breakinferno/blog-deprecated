
import memory from '@/utils/localstorage'
import Config from '../../config'
const loginMixin = {
  methods: {
    isLogined () {
      let baseInfo = JSON.parse(memory.getItem(Config.baseDataName))
      if (!baseInfo) {
        return false
      }
      if (+baseInfo.duration > Date.now()) {
        return true
      }
      return false
    }
  }
}

export default loginMixin
