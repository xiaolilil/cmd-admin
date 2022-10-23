<template>
  <div class="goods-list center">
    <ul class="goods-item">
      <li v-for="(v, i) in list" :key="i" @click="toDetails(v)">
        <div class="img">
          <img :src="v.commodityImgUrl" :lazy="true" alt="" />
        </div>
        <p class="name"><span>活动</span> {{ v.commodityName }}</p>
        <p class="price">
          <span class="new">￥{{ v.commodityNewPrice }}</span>
          <span class="old">￥{{ v.commodityOldPrice }}</span>
        </p>
        <p class="sale">月销量 {{ v.commoditySales }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    list: any[]
  }>(),
  {
    list: () => [],
  },
)

const router = useRouter()
// 去商品详情页 把商品ID传递过去
const toDetails = (obj: any) => {
  router.push({
    path: '/home/goodsDetails',
    query: { id: obj.id },
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
