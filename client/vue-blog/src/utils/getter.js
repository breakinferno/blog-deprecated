function getter (obj, path) {
  const arrayRegx = /(\[)(\d+)(\])/g
  path = Array.isArray(path) ? path.join('.') : path
  path = path.replace(arrayRegx, '.$2').split('.')
  return path.reduce((target, p) => {
    return (target || {})[p]
  }, obj)
}
export default getter
