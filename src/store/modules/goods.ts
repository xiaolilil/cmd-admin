import { defineStore } from 'pinia'
import { IGoodsState } from '../types'
import LocalCache from '@/utils/cache'
import { store } from '../index'

// import { useMainrStores } from './main'

// 第一个参数，唯一不可重复，字符串类型，作为仓库ID 以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
const useGoodsStore = defineStore({
  id: 'goods',
  state: (): IGoodsState => {
    return {
      currTitle: '',
      currType: [''],
      goodsInfo: { goods_id: 0 },
    }
  },
  getters: {
    getGoodsInfo(): object {
      if (this.goodsInfo.goods_id > 0) {
        return this.goodsInfo
      } else {
        return LocalCache.getCache('pet-goods')
      }
    },
  },
  actions: {
    setGoodsInfo(payload: any) {
      this.goodsInfo = payload
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

export default useGoodsStore
export function useGoodsStores() {
  return useGoodsStore(store)
}
