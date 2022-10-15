<template>
  <div class="GoodsDetailsImg" ref="goodsDetailsImgRef">
    <div class="goodsData">
      <div class="top">
        <h3>
          品牌: <span>{{ goodsData.brand }}</span>
        </h3>
        <div class="right">
          <p>
            <b>生产产地:</b> <span>{{ goodsData.place }}</span>
          </p>
          <p>
            <b>品牌起源地:</b> <span>{{ goodsData.origin }}</span>
          </p>
        </div>
      </div>

      <div class="love">
        <img src="@/assets/love.png" alt="" />
        <div class="info">
          <p>公益宝贝</p>
          <p>
            每笔成交将为 <span>动物关爱计划</span> 捐赠
            <span>{{ goodsData.donation }}</span> 元 ，已累计捐赠
            <span>{{ goodsData.donationTotal }}</span> 笔。
          </p>
        </div>
      </div>
    </div>
    <div class="img" v-for="(v, i) in detailsData" :key="i">
      <img :src="v" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = withDefaults(
  defineProps<{
    detailsData: any[]
    goodsData: any
  }>(),
  {
    detailsData: () => [],
    goodsData: () => {},
  },
)
const goodsDetailsImgRef = ref<InstanceType<typeof HTMLDivElement>>()
defineExpose({ goodsDetailsImgRef })
</script>

<style lang="less" scoped>
.GoodsDetailsImg {
  border: 1px solid #74be5f;
  background-color: #bec472;

  .goodsData {
    width: 90%;
    height: 150px;
    margin: auto;
    background-color: #f8f8f8;
    box-sizing: border-box;
    padding: 15px;
    .top {
      display: flex;
      justify-content: space-between;
      .right {
        p {
          line-height: 25px;
        }
      }
    }

    .love {
      display: flex;
      margin-top: 20px;
      img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
      }
      p {
        color: rgb(107, 105, 105);
        span {
          color: black;
          margin: 0 3px;
        }
      }
    }
  }
  .img {
    text-align: center;
    img {
      width: 90%;
    }
  }
}
</style>
