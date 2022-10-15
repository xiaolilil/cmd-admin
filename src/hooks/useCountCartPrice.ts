import usePinia from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export function useCountCartPrice() {
  const { cart } = usePinia()
  const { goodsList, unpaidOrder, theUnpaid } = storeToRefs(cart)

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
    return theUnpaid.value.goodsList[0].num * theUnpaid.value.goodsList[0].price
  })

  return { totalPrice, goodsList, theUnpaidPrice }
}
