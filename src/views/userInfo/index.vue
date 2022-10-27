<template>
  <div class="userInfo">
    <nav-top></nav-top>
    <Header></Header>
    <div class="content">
      <div class="nav-left">
        <div class="title">
          <i class="iconfont icon-mima"></i>
          <span>账户管理</span>
        </div>
        <p
          class="myinfo"
          :class="{ active: currComp == 'MyInfo' }"
          @click="changeComp('MyInfo')"
        >
          个人信息
        </p>
        <p
          class="address"
          :class="{ active: currComp == 'Address' }"
          @click="changeComp('Address')"
        >
          收获地址
        </p>
      </div>
      <div class="comps">
        <component :is="componentConfig[currComp]"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavTop from '@/components/nav-top/index.vue'
import Header from './components/header.vue'
import MyInfo from './components/my-info.vue'
import Address from './components/address.vue'

import { ref } from 'vue'

// 子组件
const componentConfig = {
  MyInfo: MyInfo,
  Address: Address,
}
const currComp = ref<string>('MyInfo')
const changeComp = (comp: string) => {
  currComp.value = comp
}
</script>

<style lang="less" scoped>
.userInfo {
  background-color: #f8f8f8;
}
.content {
  width: 900px;
  height: 800px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .nav-left {
    width: 150px;
    height: 400px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }
  .comps {
    width: 720px;
    height: 600px;
    background-color: #fff;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

.nav-left {
  .title {
    i {
      font-size: 20px;
      margin-right: 3px;
    }
    span {
      font-weight: 600;
    }
    margin-bottom: 10px;
  }
  p {
    cursor: pointer;
    line-height: 28px;
  }
}
.active {
  color: red;
}
</style>
