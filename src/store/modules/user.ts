import { defineStore } from 'pinia'
import { IUserState } from '../types'
import { store } from '../index'

// import { useMainrStores } from './main'

const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => {
    return {
      token: '',
      userId: 0,
      username: '',
      avatar: '',
      address: '',
      isLogin: false,
      ip: '',
    }
  },
  getters: {},
  actions: {
    // 保存用户信息
    setUserInfo(userData: any) {
      // 把数据解构出来
      const { id, token, avatar, username, ip } = userData
      this.token = token
      this.userId = id
      this.avatar = avatar
      this.username = username
      this.isLogin = true
      this.ip = ip
    },
    // 保存地址
    setAddress(payload: any[]) {
      this.address = payload[0] + payload[1] + payload[2]
    },
    clearInfo() {
      console.log('this', this)
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

export default useUserStore
export function useUserStores() {
  return useUserStore(store)
}
