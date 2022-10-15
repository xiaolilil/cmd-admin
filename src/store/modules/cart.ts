import { defineStore } from 'pinia'
import { ICartState, IAddress } from '../types'
import LocalCache from '@/utils/cache'
import { store } from '../index'

// 第二个参数，以对象形式配置仓库的state,getters,actions
const useCartStore = defineStore({
  id: 'cart',
  state: (): ICartState => {
    return {
      goodsList: [],
      currSteps: 0,
      userAddress: [],
      isCheckGoodsList: [],
      paidOrder: [],
      unpaidOrder: [],
      theUnpaid: {},
    }
  },
  getters: {},
  actions: {
    setGoodsList(payload: any) {
      // 如果购物车没有商品，直接进行 push 添加
      if (!this.goodsList.length) {
        console.log('233', 233)
        this.goodsList.push(payload)
      } else {
        this.goodsList.forEach((i) => {
          // 如果购物车已经存在该商品 只是进行商品数量 + 的操作
          if (i.goods_id === payload.goods_id) {
            i.num = i.num + payload.num
          } else {
            // 如果购物车没有该商品，进行 push 添加
            this.goodsList.push(payload)
          }
        })
      }
    },
    changeCurrSteps(payload: number) {
      this.currSteps = payload
    },
    saveUserAddress(payload: any) {
      // console.log('payload', payload)

      this.userAddress.push(payload)
      // 保存默认地址到本地
      if (payload.isDefault) {
        LocalCache.setCache('pet-address', payload)
      }

      console.log('this.userAddress', this.userAddress)
    },
    setCheckGoosList(list: any[]) {
      this.isCheckGoodsList = list
    },
    savePaidOrder(list: any) {
      this.paidOrder.push(list)
    },
    saveUnpaidOrder(list: any) {
      this.unpaidOrder.push(list)
    },
    deleteUnpaid() {
      this.unpaidOrder = []
      this.paidOrder = []
    },
    toPayGoods(obj: any) {
      this.theUnpaid = obj
    },
  },
  persist: {
    enabled: true, // 这个配置代表存储生效，而且是整个store都存储
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
})

export default useCartStore
export function useCartStores() {
  return useCartStore(store)
}
