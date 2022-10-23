import service from '@/utils/request.js'
import { IRecommendGoodsType } from '@/types/apis'

/**  获取商品分类ID列表
 * @description:
 * @param {*} data {arr: 分类ID [1]}
 * @return {*}
 */
export function getClassifyGoodsApi(params: IRecommendGoodsType) {
  return service({
    url: '/news/goods/foodStuff',
    method: 'get',
    params,
  })
}
