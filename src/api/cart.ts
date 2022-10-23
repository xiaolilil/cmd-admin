import service from '@/utils/request'
import { ICart } from '@/types/apis'

/**
 * @description: 获取购物车信息
 * @param {object} params { user_id: 1 } 用户id
 * @return {*}
 */
export function getCartApi(params: { user_id: number }) {
  return service({
    url: '/shopping/getShopping',
    method: 'get',
    params,
  })
}

/**
 * @description: 移除购物车
 * @param {ICart} data {user_id:1, goods_id:10}
 * @return {*}
 */
export function removeCartApi(data: ICart) {
  return service({
    url: '/shopping/removeShopping',
    method: 'post',
    data,
  })
}

/**
 * @description: 清空购物车
 * @param {object} data { user_id: 2 }
 * @return {*}
 */
export function clearCartApi(data: { user_id: number }) {
  return service({
    url: '/shopping/clearShopping',
    method: 'post',
    data,
  })
}
