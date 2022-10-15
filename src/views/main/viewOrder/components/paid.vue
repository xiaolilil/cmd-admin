<template>
  <div class="all-order">
    <order-list :list="paidOrder"> </order-list>
  </div>
</template>

<script lang="ts" setup>
import OrderList from './order-list.vue'
import { useCartData } from '../hooks/useCartData'

const { paidOrder } = useCartData()
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.all-order {
  width: 1200px;
  margin: 20px auto;
  border: 1px solid @basic-color;
}
</style>
