
import axios from 'axios'

const service = axios.create({
  baseURL: 'api',
  timeout: 10000,
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    config.headers.ContentType = "application/json;charset=utf-8";

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

    return response.data
  },
  (error) => {
    // do something
    return Promise.reject(error)
  },
)

export default service
