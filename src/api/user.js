import service from '../utils/request'

/**
 * @description: 登录
 * @param {*} data {petName:'', petPwd:''}
 * @return {*} 
 */
export function loginApi(data) {
  return service({
    url: 'users/login',
    method: 'post',
    data: data,
  })
}

/**
 * @description: 注册
 * @param {*} data {petName:'', petPwd:''}
 * @return {*}
 */
export function registerApi(data) {
  return service({
    url: 'users/register',
    method: 'post',
    data: data,
  })
}