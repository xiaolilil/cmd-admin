import service from '@/utils/request'
import { IInitTypes } from '@/types/apis'

/**
 * @description: 登录
 * @param {*} data {petName:'', petPwd:''}
 * @return {*}
 */
export function loginApi(data: IInitTypes) {
  return service({
    url: '/users/login',
    method: 'post',
    data: data,
  })
}

/**
 * @description: 注册
 * @param {*} data {petName:'', petPwd:''}
 * @return {*}
 */
export function registerApi(data: IInitTypes) {
  return service({
    url: '/users/register',
    method: 'post',
    data: data,
  })
}
