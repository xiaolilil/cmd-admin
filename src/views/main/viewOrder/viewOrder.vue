<template>
  <div class="line"></div>
  <div v-if="token && allOrderList" class="viewOrder">
    <nav-menu :list="menuList" @updateMenu="updateMenu"></nav-menu>
    <component :is="componentConfig[currCom]"></component>
  </div>
  <div v-else-if="!token" class="empty">
    <h2>你还未登录,请登录后再查看订单</h2>
  </div>
  <div v-if="!allOrderList" class="empty">
    <h2>当前没有订单信息</h2>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
// import { viewOrderApi } from '@/apis/order.js'
import { ref } from 'vue'
import LocalCache from '@/utils/cache'
import NavMenu from '@/components/nav-menu/nav-menu.vue'
import Paid from './components/paid.vue'
import UnPay from './components/unpay.vue'
import AllOrder from './components/allOrder.vue'
import { useCartData } from './hooks/useCartData'

const { allOrderList } = useCartData()

const token = ref('')
token.value = LocalCache.getCache('pet-token')

// const paidOrder = ref<any>(null)
// paidOrder.value = LocalCache.getCache('pet-pay-order')

// 菜单列表
const menuList = [
  {
    label: '全部订单',
    idx: 'AllOrder',
  },
  {
    label: '已付款',
    idx: 'Paid',
  },
  {
    label: '待付款',
    idx: 'UnPay',
  },
]

// 子组件对象
const componentConfig = {
  Paid: Paid,
  UnPay: UnPay,
  AllOrder: AllOrder,
}

// 当前展示的组件
const currCom = ref('AllOrder')
const updateMenu = (menu: string) => {
  currCom.value = menu
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.line {
  height: 2px;
  background-color: @basic-color;
}

.viewOrder {
  width: 1200px;
  min-height: 300px;
  margin: 20px auto;

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

.empty {
  height: 235px;
  h2 {
    text-align: center;
    line-height: 235px;
    color: #f60;
    cursor: pointer;
  }
}
</style>
