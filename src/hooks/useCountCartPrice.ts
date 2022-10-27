import usePinia from '@/store'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { getCartApi } from '@/api/cart'

export function useCountCartPrice() {
  const { user, cart } = usePinia()
  const { goodsList, newData } = storeToRefs(cart)
  // const userId = user.userId
  // getCartApi({ user_id: userId }).then((res) => {
  //   goodsList = res.data
  // })

  if (goodsList.value.length) {
    let idList = goodsList.value.map((item: any) => {
      return item.goods_id
    })

    function getRepeatNum() {
      return idList.reduce((prev: any, next: any) => {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
    }
    const nums = getRepeatNum()
    for (const key in nums) {
      goodsList.value.forEach((i: any) => {
        if (i.goods_id == key) {
          i.num = nums[key]
        }
      })
    }
    let newList = JSON.parse(JSON.stringify(goodsList.value))
    let obj = {}
    let res = newList.reduce((cur: any, next: any) => {
      obj[next.goods_id] ? '' : (obj[next.goods_id] = true && cur.push(next))
      return cur
    }, [])
    cart.saveNewData(res)
  }

  //设置cur默认类型为数组，并且初始值为空的数组

  const cartTotalPrice = computed(() => {
    let total = 0
    // 循环计算商品总价
    // for (let i = 0; i < goodsList.value.length; i++) {
    //   total +=
    //     (goodsList.value[i].num ? 5 : 1) * goodsList.value[i].commodityNewPrice
    // }
    return total
  })

  const totalPrice = computed(() => {
    // 筛选出确认的商品数据
    // let checkLists = newData.filter((i: any) => i.isCheck === true)
    let total = 0

    if (!newData.value.length) return 0
    // 循环计算商品总价
    for (let i = 0; i < newData.value.length; i++) {
      total += newData.value[i].num * newData.value[i].commodityNewPrice
    }
    return total
  })

  const theUnpaidPrice = computed(() => {
    // let total = 0
    // 循环计算商品总价
    // for (let i = 0; i < unpaidOrder.value.length; i++) {
    //   for (let k = 0; k < unpaidOrder.value[i].goodsList.length; k++) {
    //     total +=
    //       unpaidOrder.value[i].goodsList[k].num *
    //       unpaidOrder.value[i].goodsList[k].price
    //   }
    // }
    // return theUnpaid.value.goodsList[0].num * theUnpaid.value.goodsList[0].price
  })

  return { totalPrice, goodsList, cartTotalPrice, theUnpaidPrice, newData }
}
