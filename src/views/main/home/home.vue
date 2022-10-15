<template>
  <div class="home">
    <!-- 顶部导航 -->
    <nav-top></nav-top>
    <!-- 头部 -->
    <Header></Header>
    <!-- 二级路由切换  -->
    <router-view></router-view>
    <!-- 底部 -->
    <head-footer></head-footer>

    <!-- 回到顶部 -->
    <back-top></back-top>
  </div>
</template>

<script lang="ts" setup>
import NavTop from '@/components/nav-top/index.vue'
import Header from '@/components/header/index.vue'
import HeadFooter from '@/layout/footer.vue'
import BackTop from '@/components/backTop/back-top.vue'
</script>

<style lang="less" scoped>
@import '@/style/common.less';
</style>
