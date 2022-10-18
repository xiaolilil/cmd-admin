import service from '@/utils/request.js'


// 获取轮播图
export function getSwiperListApi() {
  return service({
    url: '/news/getSwiper',
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



// 获取商品主粮
export function getGoodsFoodStuffApi() {
  return service({
    url: '/news/goods/foodStuff',
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