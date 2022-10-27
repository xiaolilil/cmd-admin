<template>
  <div class="head">
    <div class="head-content center">
      <img
        @click="toHome"
        class="logo"
        src="@/assets/common/logo.webp"
        alt=""
      />
      <div v-if="isShowCart" class="cart" @click="toCart">
        <span>购物车</span>
        <span v-if="user.isLogin">({{ newData.length }})</span>
      </div>
      <el-steps
        v-if="!isShowCart"
        :space="100"
        :active="currSteps"
        finish-status="success"
      >
        <el-step title="购物车" />
        <el-step title="提交订单" />
        <el-step title="支付" />
      </el-steps>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import usePinia from '@/store'
import { ref, watch } from 'vue'
import { useCountCartPrice } from '@/hooks/useCountCartPrice'

const { user, cart } = usePinia()
const router = useRouter()
const route = useRoute()
const { newData } = useCountCartPrice()

const toCart = () => {
  console.log('222', 222)
  router.push('/home/cart')
}
const toHome = () => {
  router.push('/home/cate')
}

const currSteps = ref(0)

const isShowCart = ref(true)

watch(
  () => route.name,
  (n) => {
    if (n === 'order') {
      currSteps.value = 1
    } else if (n === 'cart') {
      currSteps.value = 0
    } else if (n === 'pay') {
      currSteps.value = 2
    }
    if (n === 'order' || n === 'cart' || n === 'pay') {
      isShowCart.value = false
    } else {
      isShowCart.value = true
    }
  },
  { immediate: true },
)
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.head {
  height: 130px;
  margin: 20px 0;
  .head-content {
    width: 1200px;
    height: 100%;
    .flex;
    .logo {
      width: 180px;
      height: 130px;
      border-radius: 20px;
      cursor: pointer;
    }
    .cart {
      width: 120px;
      height: 40px;
      background-image: url(@/assets/common/cart.gif);
      line-height: 40px;
      text-align: right;
      cursor: pointer;
    }
    .el-steps {
      width: 300px;
    }
  }
}
</style>
