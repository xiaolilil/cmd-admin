import { defineStore } from 'pinia'
import { IUserState } from '../types'
import { store } from '../index'

// import { useMainrStores } from './main'

// id: 'user',作为仓库ID 以区分仓库
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
    }
  },
  getters: {},
  actions: {
    setUserInfo(userData: any) {
      // 把数据解构出来
      const { id, token, avatar, username } = userData
      this.token = token
      this.userId = id
      this.avatar = avatar
      this.username = username
      this.isLogin = true
    },
    setAddress(payload: any[]) {
      this.address = payload[0] + payload[1] + payload[2]
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
