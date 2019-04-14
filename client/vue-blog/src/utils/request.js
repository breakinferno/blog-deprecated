import axios from 'axios'
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据，后面会提到
import { getItem } from './localstorage'
import Config from '../../config'
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  console.log('当前环境变量为development')
  axios.defaults.baseURL = 'http://127.0.0.1:8888'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://real.breakinferno.com'
} else {
  axios.defaults.baseURL = '127.0.0.1:8888'
}

axios.defaults.timeout = 10000

axios.interceptors.request.use(config => {
  let baseInfo = getItem(Config.baseDataName)
  if (baseInfo) {
    config.headers['access-token'] = JSON.parse(baseInfo).token
  }
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response) {
      // switch (error.response.status) {
      //   case 401:
      //     break
      //   case 403:
      //     break
      //   case 404:
      //     break
      //   default:
      // }
    }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  })

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求数据]
 */
export function post (url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(data))
      .then(res => resolve(res.data))
      .catch(err => reject(err.data))
  })
}
