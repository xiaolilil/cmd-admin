import service from '@/utils/request'
import {
  IGoodsType,
  ICommentGoodsType,
  ICommentListType,
  ICart,
} from '@/types/apis'

/**
 * @description: 获取对应商品数据
 * @param {*} params {id :1}
 * @return {*}
 */
export function getGoodsDataApi(params: IGoodsType) {
  return service({
    url: 'news/goods/getGoodid',
    method: 'get',
    params,
  })
}

/**
 * @description: 获取商品评论
 * @param {*} params {commodityMessageId：1 }
 * @return {*}
 */
export function getCommentApi(params: ICommentListType) {
  return service({
    url: '/comment/getcomment',
    method: 'get',
    params,
  })
}

/**
 * @description: 评论商品
 * @param {*} data {commodityMessageId：1， userId:2, commentContent:'好' }
 * @return {*}
 */
export function addCommentApi(data: ICommentGoodsType) {
  return service({
    url: '/comment/addcomment',
    method: 'post',
    data,
  })
}

/**
 * @description: 添加到购物车
 * @param {ICart} data {user_id:1,num:10,  goods_id:10}
 * @return {*}
 */
export function addCartApi(data: ICart) {
  return service({
    url: '/shopping/addShopping',
    method: 'post',
    data,
  })
}
