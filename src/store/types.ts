export interface IUserState {
  userId: number
  avatar: string
  username: string
  token: string
  address: ''
}

export interface IGoodsState {
  currTitle: string
  currType: string[]
  goodsInfo: {
    goods_id: number
  }
}

export interface IAddress {
  name?: string
  mobile?: string
  detailsAddress?: string
  address?: any[]
}

export interface ICartState {
  goodsList: any[]
  currSteps: number
  userAddress: any[]
  isCheckGoodsList: any[]
  paidOrder: any[]
  unpaidOrder: any[]
  theUnpaid: any
}
