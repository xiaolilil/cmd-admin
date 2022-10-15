import service from '../utils/request'

// 登录
export function loginApi(data) {
  return service({
    url: 'users/login',
    method: 'post',
    data: data,
  })
}

// 注册
export function registerApi(data) {
  return service({
    url: 'users/register',
    method: 'post',
    data: data,
  })
}