import service from '@/utils/request'
import { IHomeCateGoodsType, IRecommendGoodsType } from '@/types/apis'

// 获取轮播图
export function getSwiperListApi() {
  return service({
    url: '/news/getSwiper',
  })
}

/**
 * @description:  获取商品分类列表
 * @param {*} params  {str: '宠物主粮'}
 * @return {*} [{}]
 */
export function getHomeCategoryApi(params: IHomeCateGoodsType) {
  return service({
    url: '/news/getCategory/foodStuff',
    method: 'get',
    params,
  })
}

/**
 * @description: 首页 推荐商品
 * @param {*} params {arr : [1]}
 * @return {*} [{}]
 */
export function getGoodsFoodStuffApi(params: IRecommendGoodsType) {
  return service({
    url: '/news/goods/foodStuff',
    method: 'get',
    params,
  })
}

// 获取分类主粮
export function getCateFoodStuffApi() {
  return service({
    url: '/news/getCategory/foodStuff',
  })
}

// 获取分类零食
export function getCateSnacksApi() {
  return service({
    url: '/news/getCategory/snacks',
  })
}

// 获取分类玩具
export function getCateToysApi() {
  return service({
    url: '/news/getCategory/toys',
  })
}

// 获取分类清洁
export function getCateCleanApi() {
  return service({
    url: '/news/getCategory/clean',
  })
}

// 获取分类洗护
export function getCateWashApi() {
  return service({
    url: '/news/getCategory/wash',
  })
}

// 获取分类服饰
export function getCateClothesApi() {
  return service({
    url: '/news/getCategory/clothes',
  })
}

// 获取商品零食
export function getGoodsSnacksApi() {
  return service({
    url: '/news/goods/snacks',
  })
}
// 获取商品玩具
export function getGoodsToysApi() {
  return service({
    url: '/news/goods/toys',
  })
}
// 获取商品服饰
export function getGoodsClothesApi() {
  return service({
    url: '/news/goods/clothes',
  })
}
