<template>
  <div class="cates">
    <!-- 轮播图 -->
    <div ref="swiperBoxRef" class="home-swiper">
      <!-- 分类 -->
      <Category></Category>
      <Swiper @curr-item="handleCurrItem" :swiper-list="swiperList"></Swiper>
      <!-- 相关信息 -->
      <Introduce></Introduce>
    </div>

    <!-- 推荐商品信息模块  主粮 -->
    <goods-info
      title="宠物主粮"
      :types="['进口主粮', '国产主粮']"
      :list="goodsStuffGoods"
      poster="src/assets/goods/cwzl0.jpg"
    ></goods-info>

    <!-- 推荐商品信息模块  零食 -->
    <goods-info
      title="宠物零食"
      :types="['肉质零食', '罐头湿粮']"
      :list="goodsSnacks"
      poster="src/assets/goods/rzls0.jpg"
    ></goods-info>

    <!-- 推荐商品信息模块  玩具 -->
    <goods-info
      title="宠物玩具"
      :types="['百货玩具']"
      :list="goodsToys"
      poster="src/assets/goods/cwwj0.jpg"
    ></goods-info>

    <!-- 推荐商品信息模块  玩具 -->
    <goods-info
      title="宠物服饰"
      :types="['可爱服饰']"
      :list="goodsClothes"
      poster="src/assets/goods/cwfs0.jpg"
    ></goods-info>
  </div>
</template>

<script lang="ts" setup>
import Swiper from '@/components/swiper/index.vue'
import Category from './components/category.vue'
import Introduce from './components/introduce.vue'
import GoodsInfo from '@/components/goods-info/index.vue'
import { onMounted, ref, watch } from 'vue'

import { getSwiperListApi, getGoodsFoodStuffApi } from '@/api/home.js'

// 定义轮播图列表变量
const swiperList = ref<{ url: string }[]>([])
// 获取轮播图列表
async function getSwiperList() {
  const { data: res } = await getSwiperListApi()
  swiperList.value = res
}
getSwiperList()

// 当前轮播图第几张 默认起始为 0
const currSwiperItem = ref(0)
// 接收子组件传递来的数据 轮播图显示索引 赋值给 当前轮播图索引变量 currSwiperItem
const handleCurrItem = (i: number) => {
  currSwiperItem.value = i
}

// 轮播图组件父元素的背景色数组
const swiperBackgroundList = [
  'rgb(36, 66, 131)',
  'rgb(167,183,240)',
  'rgb(255,167,102)',
  'rgb(255,80,80)',
]
// 定义轮播图组件父元素 ref
const swiperBoxRef = ref<HTMLDivElement>()
// 挂载后 轮播图默认显示的是第一张，把背景色数组索引0的背景色赋值给父元素盒子背景色
onMounted(() => {
  swiperBoxRef.value!.style.backgroundColor = swiperBackgroundList[0]
})
// 监听 轮播图组件索引的变化，对轮播图组件父元素背景色做对应的改变
watch(
  () => currSwiperItem,
  (n) => {
    swiperBoxRef.value!.style.backgroundColor = swiperBackgroundList[n.value]
  },
  {
    deep: true,
  },
)

// 获取商品 宠物主粮
const goodsStuffGoods = ref([])
async function getGoodStuffGoods() {
  const { data: res } = await getGoodsFoodStuffApi({
    arr: JSON.stringify([1, 2]),
  })
  goodsStuffGoods.value = res
}
getGoodStuffGoods()

// 获取商品 宠物零食
const goodsSnacks = ref([])
async function getGoodSnacks() {
  const { data: res } = await getGoodsFoodStuffApi({
    arr: JSON.stringify([3, 4]),
  })
  goodsSnacks.value = res
}
getGoodSnacks()

// 获取商品 宠物玩具
const goodsToys = ref([])
async function getGoodsToys() {
  const { data: res } = await getGoodsFoodStuffApi({ arr: JSON.stringify([5]) })
  goodsToys.value = res
}
getGoodsToys()

// 获取商品 宠物服饰
const goodsClothes = ref([])
async function getGoodsClothes() {
  const { data: res } = await getGoodsFoodStuffApi({
    arr: JSON.stringify([10]),
  })
  goodsClothes.value = res
}
getGoodsClothes()
</script>

<style lang="less" scoped>
.home-swiper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 0 15px #ccc;
  margin-bottom: 50px;
}
</style>
