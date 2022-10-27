<template>
  <div class="header">
    <div class="center">
      <img
        class="logo"
        @click="router.push('/home')"
        src="@/assets/common/logo.webp"
        alt=""
      />
      <i
        @click="router.push('/home/cart')"
        class="iconfont cart icon-gouwuche"
      ></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="less" scoped>
.header {
  height: 120px;
  background-color: #1fac75;
  .center {
    width: 900px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 90px;
      border-radius: 20px;
    }
    .cart {
      font-size: 50px;
      color: #fff;
    }
  }
}
</style>
