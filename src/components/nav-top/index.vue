<template>
  <div class="navTop">
    <div class="nav-top-box center">
      <home-address></home-address>
      <home-nav-fn></home-nav-fn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HomeAddress from './src/address.vue'
import HomeNavFn from './src/nav-fn.vue'
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.navTop {
  background-color: #f8f8f8;
  height: 35px;
  border-bottom: 1px solid @basic-color;
  .nav-top-box {
    width: 1200px;
    height: 35px;
    .flex;
  }
}
</style>
