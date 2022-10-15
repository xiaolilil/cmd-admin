const Mock = require('mockjs');

function getDate() {
  let dt = new Date()
  let y = dt.getFullYear()
  let mt = dt.getMonth() + 1
  let day = dt.getDate() + 1
  let h = dt.getHours()  //获取时
  let m = dt.getMinutes() //获取分
  let s = dt.getSeconds() //获取秒

  return `${y}-${mt}-${day} ${h}-${m}-${s}`
}

export default [
  {
    // 提交订单
    url: "/api/placeOrder",
    method: "post",
    response: (req) => {
      let { goods, total_price } = req.body
      if (goods && total_price) {
        return {
          code: 200,
          message: "success",
          data: {
            'orderId|10000000-19999999': 123678812,
            totalPrice: total_price,
            msg: '恭喜，订单提交成功!',
            goodsList: goods,
            deadline: getDate(),
            isPay: 0
          },
        };
      } else {
        return {
          code: 401,
          message: "当前订单信息有误",
          data: null,
        };
      }
    },
  },
  {
    // 支付
    url: "/api/order/pay",
    method: "post",
    response: (req) => {
      const { pay, goods, address, orderId } = req.body
      return {
        code: 200,
        message: "订单支付成功",
        data: {
          isPay: 1,
          name: address.name,
          payInfo: {
            totalPrice: pay,
          },
          logistics: {
            delivery_mode: '京东快递',
            'freight|10000000-19999999': 12172819,
            company: '京东快递 (成都)',
          },
          goodsList: [...goods],
          order: {
            orderId: orderId,
            order_time: '@datetime',
            username: address.name,
            mobile: address.mobile,
            address: address.address[0] + address.address[1] + address.address[2],
            goods_price: '2222',
            fare: pay,
            discount: 0,
            paid: pay,
            unpaid: 0,
            order_price: pay,
          }
        }
      }
    }
  },
  {
    // 查看订单
    url: "/api/viewOrder",
    method: "get",
    response: () => {

      // const { orderId } = req.body



      return {
        code: 200,
        message: "查看订单成功",
        data: {
          payInfo: {
            totalPrice: 12121,
          },
          logistics: {
            delivery_mode: '京东快递',
            'freight|10000000-19999999': 12172819,
            company: '京东快递 (成都)',
          },
          order: {
            orderId: 'sadasdsa',
            order_time: '@datetime',
            username: 'xxx',
            mobile: 'xxx',
            address: '',
            goods_price: '2222',
            fare: 'xxx',
            discount: 0,
            paid: 'xxx',
            unpaid: 'xxx',
            order_price: '11111'
          }
        }

      }
    }
  }



];