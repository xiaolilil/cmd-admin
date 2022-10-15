import service from './request.js'

const api = {
  swiper: '/api/getSwiper',
  foodStuff: '/api/getCategory/foodStuff',
  snacks: '/api/getCategory/snacks',
  toys: '/api/getCategory/toys',
  clean: '/api/getCategory/clean',
  wash: '/api/getCategory/wash',
  clothes: '/api/getCategory/clothes',
  goodsFoodStuff: '/api/goods/foodStuff',
  goodsSnacks: '/api/goods/snacks',
  goodsToys: '/api/goods/toys',
  goodsClothes: '/api/goods/clothes',
}

// 获取轮播图
export function getSwiperListApi() {
  return service({
    url: api.swiper,
    method: 'get',
  })
}

// 获取分类主粮
export function getCateFoodStuffApi() {
  return service({
    url: api.foodStuff,
    method: 'get',
  })
}
// 获取分类零食
export function getCateSnacksApi() {
  return service({
    url: api.snacks,
    method: 'get',
  })
}
// 获取分类玩具
export function getCateToysApi() {
  return service({
    url: api.toys,
    method: 'get',
  })
}
// 获取分类清洁
export function getCateCleanApi() {
  return service({
    url: api.clean,
    method: 'get',
  })
}
// 获取分类洗护
export function getCateWashApi() {
  return service({
    url: api.wash,
    method: 'get',
  })
}
// 获取分类服饰
export function getCateClothesApi() {
  return service({
    url: api.clothes,
    method: 'get',
  })
}

// 获取商品主粮
export function getGoodsFoodStuffApi() {
  return service({
    url: api.goodsFoodStuff,
    method: 'get',
  })
}

// 获取商品零食
export function getGoodsSnacksApi() {
  return service({
    url: api.goodsSnacks,
    method: 'get',
  })
}
// 获取商品玩具
export function getGoodsToysApi() {
  return service({
    url: api.goodsToys,
    method: 'get',
  })
}
// 获取商品服饰
export function getGoodsClothesApi() {
  return service({
    url: api.goodsClothes,
    method: 'get',
  })
}