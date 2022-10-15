import service from './request.js'

const api = {
  goodsDetails: '/api/goodsDetails',
}

// 获取商品分类数据
export function getClassifyApi(goodsInfo) {
  return service({
    url: api.goodsDetails,
    method: 'post',
    data: goodsInfo
  })
}