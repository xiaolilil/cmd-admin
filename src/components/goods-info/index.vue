<template>
  <div class="goods-info">
    <!-- 头部标题 类型 -->
    <div class="head">
      <span class="title">{{ title }}</span>
      <ul class="types">
        <li
          v-for="(v, i) in types"
          :key="i"
          :class="{ active: currTypes == v }"
          @mouseenter="changeCurrTypes(v, i)"
        >
          <span>{{ v }}</span>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list" v-if="list.length">
      <div class="goods-list-l">
        <img :src="poster" alt="" />
      </div>
      <ul class="goods-list-r">
        <li
          class="goods-item"
          v-for="(v, i) in currGoodsList"
          :key="i"
          @click="toGoodsInfo(v)"
        >
          <div class="img"><img :src="v.commodityImgUrl" alt="" /></div>
          <p class="name">{{ v.commodityName }}</p>
          <span class="price">￥{{ v.commodityNewPrice }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, watch, reactive } from 'vue'
import LocalCache from '@/utils/cache'
import usePinia from '@/store'

const { goods } = usePinia()

const props = withDefaults(
  defineProps<{
    title: string
    types: string[]
    list: any[]
    poster: string
  }>(),
  {
    list: () => [],
  },
)

const data1 = ref<any[]>([])
const data2 = ref<any[]>([])
// 当前展示商品列表数组
const currGoodsList = ref<any[]>([])
// 监听props.list的变化
watch(
  () => props.list,
  (n) => {
    // currGoodsList.value = n[1]?.data
    data1.value = props.list.slice(0, 8)
    data2.value = props.list.slice(8, 16)
    currGoodsList.value = data1.value
  },
  { immediate: true },
)

// 当前展示的商品种类 默认为 types里面的第一项
const currTypes = ref(props.types[0])
// 鼠标移入改变 当前商品类型
const changeCurrTypes = (type: string, index: number) => {
  currTypes.value = type
  // 鼠标切换类型， 对应商品数组列表进行切换 重新赋值
  // currGoodsList.value = props.list[index + 1]?.data
  switch (type) {
    case '进口主粮':
      currGoodsList.value = data1.value
      break
    case '国产主粮':
      currGoodsList.value = data2.value
      break
    case '肉质零食':
      currGoodsList.value = data1.value
      break
    case '罐头湿粮':
      currGoodsList.value = data2.value
      break

    default:
      break
  }
}

// 跳转到商品详情页
const router = useRouter()
const toGoodsInfo = (v: any) => {
  goods.setGoodsInfo(v)
  LocalCache.setCache('pet-goods', v)
  router.push({
    path: '/home/goodsDetails',
    query: {
      goods_id: v.goods_id,
    },
  })
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.goods-info {
  width: 1200px;
  height: 450px;
  margin: auto;
  margin-bottom: 50px;
  border: 1px solid @basic-color;
  .head {
    height: 45px;
    border-bottom: 1px solid @basic-color;
    box-sizing: border-box;
    .flex;
    .title {
      font-size: 20px;
      color: @basic-color;
    }
    .types {
      width: 170px;

      .flex;
      li {
        line-height: 45px;
        flex: 1;
        text-align: center;
        border: 1px solid transparent;
        cursor: pointer;
      }
      .active {
        background-color: @basic-color;
        border-bottom: 1px solid #fff;
        span {
          color: #fff;
        }
      }
    }
  }
  .goods-list {
    .flex(@align:start);
    .goods-list-l {
      width: 320px;
      height: 405px;

      img {
        width: 320px;
        height: 405px;
      }
    }
    .goods-list-r {
      flex: 1;
      height: 405px;
      padding-left: 30px;
      .flex2(@align:space-evenly);
      .goods-item {
        width: 210px;
        height: 190px;
        cursor: pointer;
        .img {
          text-align: center;
          width: 210px;
          height: 125px;

          &:hover img {
            margin-top: -6px;
          }
          img {
            width: 118px;
            height: 118px;
            transition: all 0.4s;
          }
        }
        .name {
          padding: 0 10px;
          font-size: 13px;
          line-height: 18px;
          display: -webkit-box;
          /* 弹性盒子元素垂直排列 */
          -webkit-box-orient: vertical;
          /* 控制要显示的行数 */
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-bottom: 5px;
          &:hover {
            color: @basic-color;
          }
        }
        .price {
          padding-left: 10px;
          color: red;
          font-size: 17px;
        }
      }
    }
  }
}
</style>
