<template>
  <div class="order-list">
    <div class="list">
      <div class="title">
        <span class="date">下单时间: <span>2022-10-13 15:53:17</span></span>
        <span class="orderId"> 订单编号: <span>15571835</span> </span>
      </div>
      <div class="tb">
        <table>
          <tbody>
            <template v-for="(v, i) in list" :key="i">
              <tr v-for="(k, i) in v.goodsList" :key="i">
                <td>
                  <img :src="k.imgUrl" alt="" />
                </td>
                <td>
                  <p>{{ k.goods_name }}</p>
                  <span>X {{ k.num }}</span>
                </td>
                <td>
                  <span>{{ v.name }}</span>
                </td>
                <td>
                  <span>￥{{ k.price }}</span>
                </td>
                <td>
                  <slot>
                    <span class="paid" v-if="v.isPay">已支付</span>
                    <button class="pay" @click="toPay(v)" v-else>付款</button>
                  </slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import usePinia from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const { cart } = usePinia()

const props = withDefaults(
  defineProps<{
    list: any[]
  }>(),
  {
    list: () => [],
  },
)
console.log('props.list', props.list)

const toPay = (v: any) => {
  cart.toPayGoods(v)
  router.push('/home/pay')
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.order-list {
  width: 1200px;
  margin: 20px auto;
  .list {
    width: 90%;
    margin: 20px auto;
    .title {
      background-color: #ccc;
      line-height: 40px;
      padding-left: 20px;
      .date {
        margin-right: 40px;
      }
    }
    .tb {
      background-color: #f8f8f8;
    }
    table {
      td {
        height: 109px;
        padding: 0 20px;
        border-top: 1px solid #ccc;
      }

      td:nth-child(1) {
        width: 70px;
        img {
          width: 80px;
          height: 80px;
          border: 1px solid #ddd;
        }
      }
      td:nth-child(2) {
        width: 430px;
        p {
          margin-bottom: 10px;
          font-size: 14px;
          height: 40px;
        }
        span {
          color: #f40;
          font-size: 20px;
        }
      }
      td:nth-child(3) {
        width: 115px;
      }
      td:nth-child(4) {
        width: 115px;
        color: red;
        font-size: 18px;
      }
      td:nth-child(5) {
        width: 115px;
        span {
          background-color: #33cb98;
          color: #fff;
          width: 80px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 3px;
          display: inline-block;
          cursor: pointer;
        }
      }
    }
  }
}
.pay {
  width: 80px;
  height: 30px;
  background-color: #e84c4c;
  color: #fff;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: #e18282;
  }
}
</style>
