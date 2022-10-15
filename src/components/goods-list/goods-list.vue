<template>
  <div class="goods-list center">
    <ul class="goods-item">
      <li v-for="(v, i) in list" :key="i" @click="toDetails(v)">
        <div class="img">
          <img :src="v.imgUrl" alt="" />
        </div>
        <p class="name"><span>活动</span> {{ v.name }}</p>
        <p class="price">
          <span class="new">￥{{ v.newPrice }}</span>
          <span class="old">￥{{ v.oldPrice }}</span>
        </p>
        <p class="sale">月销量 {{ v.sales }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import LocalCache from '@/utils/cache'
import usePinia from '@/store'

const props = withDefaults(
  defineProps<{
    list: any[]
  }>(),
  {
    list: () => [],
  },
)

const { goods } = usePinia()
const router = useRouter()
const toDetails = (obj: any) => {
  LocalCache.setCache('pet-goods', obj)
  goods.setGoodsInfo(obj)
  router.push({
    path: '/home/goodsDetails',
    query: { goods_id: obj.goods_id },
  })
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.goods-list {
  width: 1230px;
  padding-bottom: 20px;
  .goods-item {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 265px);
    grid-template-rows: repeat(auto-fill, 350px);
    gap: 56px;
    li {
      // width: 265px;
      // height: 340px;
      background-color: #fff;
      // margin: 15px 0;
      border-radius: 5px;
      padding: 20px 15px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 5px #f40;
      }

      .img,
      .img img {
        width: 200px;
        height: 200px;
        margin: auto;
      }
      .name {
        margin: 10px 0;
        span {
          color: #fff;
          background-color: coral;
          border-radius: 10px;
          font-size: 13px;
          padding: 2px 10px;
        }
        font-size: 14px;
        line-height: 22px;
        display: -webkit-box;
        /* 弹性盒子元素垂直排列 */
        -webkit-box-orient: vertical;
        /* 控制要显示的行数 */
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .price {
        .new {
          font-size: 18px;
          color: #ff6600;
          font-weight: bold;
        }
        .old {
          font-size: 13px;
          color: rgb(156, 156, 156);
          text-decoration: line-through;
          margin-left: 10px;
        }
      }
      .sale {
        line-height: 30px;
        font-size: 14px;
        color: rgb(156, 156, 156);
      }
    }
  }
}
</style>
