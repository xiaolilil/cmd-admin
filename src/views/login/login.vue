<template>
  <div class="login">
    <!-- 头部 -->
    <app-header></app-header>
    <!-- 表单 -->
    <login-form></login-form>
    <!-- 底部 -->
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts" setup>
import appHeader from '@/layout/header.vue'
import LoginForm from './components/login-form.vue'
import appFooter from '@/layout/footer.vue'
</script>

<style lang="less" scoped></style>
