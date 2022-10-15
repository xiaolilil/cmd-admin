<template>
  <div class="register">
    <app-header></app-header>
    <register-form></register-form>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/layout/header.vue'
import AppFooter from '@/layout/footer.vue'
import RegisterForm from './components/register-form.vue'
</script>

<style lang="less" scoped></style>
