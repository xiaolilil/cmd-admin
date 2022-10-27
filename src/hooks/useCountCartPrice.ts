import usePinia from '@/store'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { getCartApi } from '@/api/cart'

export function useCountCartPrice() {
  const { user, cart } = usePinia()
  const { goodsList } = storeToRefs(cart)
  // const userId = user.userId
  // getCartApi({ user_id: userId }).then((res) => {
  //   goodsList = res.data
  // })

  const cartTotalPrice = computed(() => {
    let total = 0
    // 循环计算商品总价
    for (let i = 0; i < goodsList.value.length; i++) {
      total +=
        (goodsList.value[i].num ? 5 : 1) * goodsList.value[i].commodityNewPrice
    }
    return total
  })

  const totalPrice = computed(() => {
    // 筛选出确认的商品数据
    let checkLists = goodsList.value.filter((i) => i.isCheck === true)
    let total = 0
    // 循环计算商品总价
    for (let i = 0; i < checkLists.length; i++) {
      total += checkLists[i].num * checkLists[i].price
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

  return { totalPrice, goodsList, cartTotalPrice, theUnpaidPrice }
}
