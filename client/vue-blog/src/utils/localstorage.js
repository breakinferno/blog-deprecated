export const getLocalStorage = (name) => {
  if (localStorage) {
    return localStorage.getItem(name)
  }
  return ''
}

export const setLocalStorage = (key, value) => {
  if (localStorage) {
    return localStorage.setItem(key, value)
  }
  throw new Error('浏览器不支持localStorage， 请升级浏览器')
}

export default { getLocalStorage, setLocalStorage }
