import service from './request.js'

const api = {
  placeOrder: '/api/placeOrder',
  viewOrder: '/api/viewOrder',
  pay: '/api/order/pay'
}

// 下单
export function placeOrderApi(data) {
  return service({
    url: api.placeOrder,
    method: 'post',
    data: data,
  })
}

// 支付
export function orderPayApi(data) {
  return service({
    url: api.pay,
    method: 'post',
    data: data,
  })
}



// 查看订单
export function viewOrderApi() {
  return service({
    url: api.viewOrder,
    method: 'get',
  })
}