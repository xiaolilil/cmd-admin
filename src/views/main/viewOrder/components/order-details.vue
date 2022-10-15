<template>
  <div class="paid">
    <!-- 商品详情 -->
    <div class="goods">
      <div class="title">
        <span>商品详情</span>
      </div>
      <table>
        <tbody>
          <tr class="label">
            <td>照片</td>
            <td>商品名称</td>
            <td>单价</td>
            <td>数量</td>
          </tr>
          <tr v-for="v in goodsList" :key="v.goods_id">
            <td class="img"><img :src="v.imgUrl" alt="" /></td>
            <td>
              <p>{{ v.goods_name }}</p>
            </td>
            <td>
              <span>{{ v.price }}</span>
            </td>
            <td>
              <span>{{ v.num }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 付款信息 -->
    <div class="pay">
      <div class="title">
        <span>付款信息</span>
      </div>
      <div class="info">
        <ul>
          <li>
            订单总金额：<span>{{ payInfo.totalPrice }}</span>
          </li>
          <li>优惠: <span>0</span></li>
          <li>
            实付金额: <span>{{ payInfo.totalPrice }}</span>
          </li>
        </ul>
        <p>支付平台: <b>支付宝</b></p>
      </div>
    </div>
    <!-- 物流信息 -->
    <div class="logistics">
      <div class="title">
        <span>物流信息</span>
      </div>
      <div class="info">
        <ul>
          <li>
            配送方式: <span>{{ logisticsInfo.delivery_mode }}</span>
          </li>
          <li>
            货运单号: <span>{{ logisticsInfo.freight }}</span>
          </li>
          <li>
            送货公司: <span>{{ logisticsInfo.company }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order">
      <div class="title">
        <span>订单信息</span>
      </div>
      <div class="info">
        <ul>
          <li>
            订单编号: <span>{{ orderInfo.orderId }}</span>
          </li>
          <li>
            下单时间: <span>{{ orderInfo.order_time }}</span>
          </li>
          <li>
            收货人: <span>{{ orderInfo.username }}</span>
          </li>
          <li>
            收货人电话: <span>{{ orderInfo.mobile }}</span>
          </li>
          <li>
            收货地址: <span>{{ orderInfo.address }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 订单操作 -->
    <div class="handle">
      <div class="title">
        <span>订单操作</span>
      </div>
      <button class="remove" @click="remove">撤销订单</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LocalCache from '@/utils/cache'

const payInfo = ref<any>({})
const logisticsInfo = ref<any>({})
const orderInfo = ref<any>({})
const goodsList = ref<any[]>([])
const paidOrder = ref<any>(null)
paidOrder.value = LocalCache.getCache('pet-pay-order')

// 用户已经登录，并且有订单再显示订单信息

payInfo.value = paidOrder.value?.payInfo
logisticsInfo.value = paidOrder.value?.logistics
orderInfo.value = paidOrder.value?.order
goodsList.value = paidOrder.value?.goodsList

const remove = () => {
  LocalCache.deleteCache('pet-pay-order')
  paidOrder.value = null
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.paid {
  width: 1200px;
  margin: 20px auto;
  border: 1px solid @basic-color;

  .goods {
    table {
      margin: 20px 0;
      padding-left: 50px;
      tbody tr {
        padding-left: 50px;
        display: flex;
        align-items: center;
        .img {
          width: 115px;
          img {
            width: 115px;
            height: 115px;
          }
        }
      }
    }
    tr:not(:first-child) {
      border-bottom: 1px solid #33cb98;
      padding: 10px 50px;
    }
    td {
      text-align: center;
      line-height: 115px;
    }
    .label {
      width: 900px;
      height: 38px;
      line-height: 38px;
      background-color: #f1f1f1;
      display: flex;
    }
    tr:not(:first-child) td {
      height: 110px;
    }

    td:nth-child(1) {
      width: 115px;
    }
    td:nth-child(2) {
      width: 450px;
    }
    td:nth-child(3) {
      width: 130px;
    }
    td:nth-child(4) {
      width: 130px;
    }
  }

  .pay {
    .info {
      padding: 30px 50px;
      ul {
        width: 600px;
        margin-bottom: 30px;
        li {
          display: inline-block;
          margin-right: 80px;
          span {
            color: #f60;
            font-weight: bold;
            font-size: 18px;
          }
        }
      }
      p {
        b {
          color: @basic-color;
          font-size: 20px;
          margin-left: 10px;
        }
      }
    }
  }

  .logistics {
    ul {
      padding: 30px 50px;
      width: 500px;
      li {
        width: 200px;
        display: inline-block;
        line-height: 35px;
        span {
          color: cornflowerblue;
        }
      }
    }
  }

  .order {
    .info {
      padding: 30px 50px;
      ul {
        width: 750px;
        li {
          display: inline-block;
          width: 360px;
          line-height: 35px;
        }
      }
    }
  }

  .title {
    background-color: #e9f7f0;
    border-top: 1px solid #b4e4c8;
    border-bottom: 1px solid #b4e4c8;
    padding: 0 50px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    font-weight: bold;
    color: rgb(92, 92, 92);
  }

  .remove {
    width: 150px;
    height: 45px;
    background-color: #33cb98;
    color: #fff;
    border: 0;
    border-radius: 7px;
    margin-top: 30px;
    margin-left: 50px;
    margin-bottom: 30px;
    cursor: pointer;
  }
}
</style>
