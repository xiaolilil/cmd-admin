<template>
  <div class="head">
    <span class="title">收获地址</span>
    <span v-if="!cart.userAddress" class="add"><span>+</span>添加新地址</span>
  </div>

  <div class="address-box">
    <div class="address-top">
      <p><span class="name">李先生</span><span>收</span></p>
      <p class="address">{{ formatAddress }}</p>
      <p>176****6592</p>
    </div>
    <div class="handle">
      <span @click="edit">编辑</span>
      <span @click="del">删除</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import usePinia from '@/store'
import { ref, computed } from 'vue'

const { cart } = usePinia()

// 收获地址
const formatAddress = computed(() => {
  let address = ''
  if (cart.userAddress) {
    if (cart.userAddress.length === 3) {
      address = cart.userAddress[0] + cart.userAddress[1] + cart.userAddress[2]
    } else {
      address = cart.userAddress[0] + cart.userAddress[1]
    }
  }
  return address
})

// 编辑地址
const edit = () => {}
// 删除地址
const del = () => {}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.head {
  .flex;

  .add {
    span {
      color: red;
      font-weight: bold;
      font-size: 16px;
      margin-right: 3px;
    }
    font-size: 13px;
  }
}

.address-box {
  width: 90%;
  height: 160px;
  border: 1px solid #ddd;
  margin: 30px auto;
  .address-top {
    height: 120px;
    padding: 20px;
    p {
      margin-bottom: 10px;
    }
    p:first-child {
      font-size: 14px;
      .name {
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
  .handle {
    height: 40px;
    background-color: #ddd;
    line-height: 40px;
    text-align: right;
    span {
      margin-right: 30px;
      font-size: 12px;
      color: cornflowerblue;
    }
  }
}
</style>
