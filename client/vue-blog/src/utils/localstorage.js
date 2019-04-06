export const getItem = (name) => {
  if (localStorage) {
    return localStorage.getItem(name)
  }
  return ''
}

export const setItem = (key, value) => {
  if (localStorage) {
    return localStorage.setItem(key, value)
  }
  throw new Error('浏览器不支持localStorage， 请升级浏览器')
}

export const getLocalStorage = () => {
  if (localStorage) {
    return localStorage
  }
  throw new Error('浏览器不支持localStorage， 请升级浏览器')
}

export const removeItem = (key) => {
  if (localStorage) {
    return localStorage.removeItem(key)
  }
  throw new Error('浏览器不支持localStorage， 请升级浏览器')
}

export const clear = () => {
  if (localStorage) {
    return localStorage.clear()
  }
  throw new Error('浏览器不支持localStorage， 请升级浏览器')
}

export default { getLocalStorage, getItem, setItem, removeItem, clear }
