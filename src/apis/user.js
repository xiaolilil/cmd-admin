//src/api/user/index.js

import service from './request.js'

const api = {
  login: '/api/login',
  loginOut: '/api/loginOut',
  register: 'api/register',
}

// 登录
export function loginApi(data) {
  return service({
    url: api.login,
    method: 'post',
    data: data,
  })
}
// 退出
export function loginOutApi() {
  return service({
    url: api.loginOut,
    method: 'get',
  })
}
// 注册
export function registerApi(data) {
  return service({
    url: api.register,
    method: 'post',
    data: data
  })
}
