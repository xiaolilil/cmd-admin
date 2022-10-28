import usePinia from '@/store'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export function useCountCartPrice() {
  const { user, cart } = usePinia()
  const { goodsList, newData } = storeToRefs(cart)

  watch(
    () => goodsList.value.length,
    () => {
      if (goodsList.value.length) {
        let idList = goodsList.value.map((item: any) => {
          return item.goods_id
        })
        // 计算相同对象的数量
        function getRepeatNum() {
          return idList.reduce((prev: any, next: any) => {
            prev[next] = prev[next] + 1 || 1
            return prev
          }, {})
        }
        const nums = getRepeatNum()
        // 给购物车数组对象添加属性 num
        for (const key in nums) {
          goodsList.value.forEach((i: any) => {
            if (i.goods_id == key) {
              i.num = nums[key]
            }
          })
        }
        let newList = JSON.parse(JSON.stringify(goodsList.value))
        let obj = {}
        // 把goods_id相同的对象去重
        let res = newList.reduce((cur: any, next: any) => {
          obj[next.goods_id]
            ? ''
            : (obj[next.goods_id] = true && cur.push(next))
          return cur
          //设置cur默认类型为数组，并且初始值为空的数组
        }, [])
        cart.saveNewData(res)
      }
    },
    { immediate: true },
  )

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

  return { totalPrice, goodsList, theUnpaidPrice, newData }
}
