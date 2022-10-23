import service from '@/utils/request'
import { IAddOrder, IOrder } from '@/types/apis'

/**
 * @description: 添加订单
 * @param {IAddOrder} data
 * @return {*}
 */
export function addOrderApi(data: IAddOrder) {
  return service({
    url: '/order/add',
    method: 'post',
    data,
  })
}

/**
 * @description: 获取订单
 * @param {IOrder} params
 * @return {*}
 */
export function getOrderApi(params: IOrder) {
  return service({
    url: '/order/show',
    method: 'get',
    params,
  })
}

/**
 * @description: 删除订单
 * @param {object} data
 * @return {*}
 */
export function removeOrderApi(data: { order_id: any }) {
  return service({
    url: '/order/remove',
    method: 'post',
    data,
  })
}
