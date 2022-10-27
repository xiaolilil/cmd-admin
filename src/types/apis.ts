export interface IInitTypes {
  petName: string
  petPwd: string
  name?: string
}

export interface IHomeCateGoodsType {
  str: string
}

export interface IRecommendGoodsType {
  arr: string
}

export interface IGoodsType {
  id: number
}

export interface ICommentListType {
  commodityMessageId: number
}

export interface ICommentGoodsType {
  commodityMessageId: number
  userId: number
  commentContent: string
  rate: number
}

export interface ICart {
  user_id: number
  goods_id: number
}

enum state {
  unpay,
  paid,
}
export interface IAddOrder {
  user_id: number
  goods_id: number
  order_address: string
  order_state: state
  order_phone: string
}

export interface IOrder {
  user_id: number
  order_state: state
}

export interface IUpadateInfo {
  userId: string
  name: string
  avatar: string
  ip: string
  time?: string
}
