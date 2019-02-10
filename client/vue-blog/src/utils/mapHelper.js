import { mapState, mapMutations } from 'vuex'

// ...mapState({
//     //"keyword":"count"    //count可以显示
//     "keyword": state => state.selectModule.keyword
// })
function mapper (path, obj, mapFn) {
  if (Object.prototype.toString.call(obj).slice(8, -1) === 'Array') {
    obj = obj.reduce((ret, v) => {
      ret[v] = state => state[path][v]
      return ret
    }, {})
  }
  return mapFn(obj)
}

function mapHelper (path) {
  return {
    _mapState: function (toMapObj) {
      return mapper(path, toMapObj, mapState)
    },
    _mapMutations: (toMapObj) => mapper(path, toMapObj, mapMutations)
  }
}

export default mapHelper
