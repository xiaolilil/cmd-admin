import { defineStore } from 'pinia'
import { ICartState, IAddress } from '../types'
import LocalCache from '@/utils/cache'
import { store } from '../index'
import { addCartApi } from '@/api/goodsDetails'
import { getCartApi, removeCartApi } from '@/api/cart'
import { useUserStores } from './user'
import { clearObj } from '@/utils/clearObj'

// 第二个参数，以对象形式配置仓库的state,getters,actions
const useCartStore = defineStore({
  id: 'cart',
  state: (): ICartState => {
    return {
      goodsList: [],
      newData: [],
      currSteps: 0,
      userAddress: [],
      addressData: {
        name: '',
        mobile: '',
        address: [],
        detailsAddress: '',
        isDefault: true,
      },
    }
  },
  getters: {},
  actions: {
    setGoodsList(payload: any) {
      // 如果购物车没有商品，直接进行 push 添加
      if (!this.goodsList.length) {
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
    // 切换步骤
    changeCurrSteps(payload: number) {
      this.currSteps = payload
    },
    // 保存用户堵住
    saveUserAddress(payload: any) {
      this.userAddress = []
      this.userAddress.push(payload)
    },

    // 添加到购物车
    async addCart(goods_id: number) {
      const res = await addCartApi({
        user_id: useUserStores().userId,
        goods_id: goods_id,
      })
      if (res.code == '200') {
        this.getCart()
        return true
      } else {
        return false
      }
    },
    // 获取购物车的商品数据
    async getCart() {
      const { data: res } = await getCartApi({
        user_id: useUserStores().userId,
      })
      this.goodsList = res
    },
    // 删除购物车数据
    async delCartGoods(payload: any) {
      const res = await removeCartApi({
        user_id: useUserStores().userId,
        goods_id: payload,
      })
      if (res.code == '200') {
        this.getCart()
      }
    },

    // 保存用户地址表单数据
    saveAddressData(payload: any) {
      this.addressData = payload
    },
    // 删除地址
    delAddressData() {
      this.addressData = clearObj(this.addressData)
    },
    // 保存新数据
    saveNewData(payload: any) {
      this.newData = payload
    },
    delNewData() {
      this.goodsList = []
      this.newData = []
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
