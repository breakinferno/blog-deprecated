// 可层级的获取对象属性，以点作为分隔符，比如level1.level2
function getter (obj, path) {
  // obj[2][]
  const arrayRegx = /(\[)(\d+)(\])/g
  path = Array.isArray(path) ? path.join('.') : path
  path = path.replace(arrayRegx, '.$2').split('.') // 处理数字key
  return path.reduce((target, p) => {
    return (target || {})[p]
  }, obj)
}
export default getter
