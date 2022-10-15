import { ref } from 'vue'
import usePinia from '@/store'
import { storeToRefs } from 'pinia'
export function useCartData() {
  const { cart } = usePinia()
  const { paidOrder, unpaidOrder } = storeToRefs(cart)

  const allOrderList = ref<any[]>([])
  allOrderList.value = [...paidOrder.value, ...unpaidOrder.value]

  return {
    allOrderList,
    paidOrder,
    unpaidOrder,
  }
}
