import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// import { ElMessage, ElMessageBox } from 'element-plus'
import LocalCache from './cache'
import usePinia from '@/store'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'api',
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`,
      )
    }
    const { user } = usePinia()
    if (user.token) {
      config.headers.token = user.token
    } else {
      config.headers.token = LocalCache.getCache('pet-token')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // const { code, msg } = response.data
    // if (code === '00000') {
    //   return response.data
    // } else {
    //   // 响应数据为二进制流处理(Excel导出)
    //   if (response.data instanceof ArrayBuffer) {
    //     return response
    //   }

    //   return Promise.reject(new Error(msg || 'Error'))
    // }
    return response.data
  },
  (error) => {
    const { code, msg } = error.response.data
    // if (code === 'A0230') {
    // token 过期
    // LocalCache.deleteCache('pet-token') // 清除浏览器全部缓存
    // window.location.href = '/' // 跳转登录页
    // ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {})
    // } else {
    // ElMessage({
    //   message: msg || '系统出错',
    //   type: 'error',
    // })
    // }
    return Promise.reject(new Error(msg || 'Error'))
  },
)

// 导出 axios 实例
export default service
