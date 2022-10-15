//src/request/axios.js

import axios from 'axios'
// 引入弹窗
import { ElMessage } from 'element-plus'
// 引入样式
import 'element-plus/theme-chalk/el-message.css'

const service = axios.create({
  // baseURL: 'http://b6drdi.natappfree.cc',
  timeout: 5000,
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pet-token')
    if (token) {
      config.headers.Authorization = token
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      // ElMessage.error(response.data.message)
      return
    } else {
      if (response.data.code !== 200) {
        // ElMessage.error(response.data.message)
        return
      }
    }

    return response.data
  },
  (error) => {
    // do something
    return Promise.reject(error)
  },
)

export default service
