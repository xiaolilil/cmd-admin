import service from './request.js'

const api = {
  classify: '/api/goods/classify',
}

// 获取商品分类数据
export function getClassifyApi(cate_id) {
  return service({
    url: api.classify,
    method: 'post',
    data: { cate_id: cate_id }
  })
}