import service from '@/utils/request.js'



/**  获取商品分类ID列表
 * @description: 
 * @param {*} data {arr: 分类ID [1]}
 * @return {*} 
 */
export function getClassifyGoodsApi(params) {
  return service({
    url: '/news/goods/foodStuff',
    method: 'get',
    params
  })
}

