<template>
  <div class="userInfo">
    <!-- 顶部导航 -->
    <nav-top></nav-top>
    <!-- 头部 -->
    <Header></Header>
    <!-- 内容区域 -->
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
        <p
          class="address"
          :class="{ active: currComp == 'ChangePassword' }"
          @click="changeComp('ChangePassword')"
        >
          修改密码
        </p>
      </div>
      <!-- 子组件展示 -->
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
import ChangePassword from './components/changePassword.vue'

import { ref } from 'vue'

// 子组件
const componentConfig = {
  MyInfo: MyInfo,
  Address: Address,
  ChangePassword: ChangePassword,
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
  height: 100%;
  padding-bottom: 100px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .nav-left {
    width: 150px;
    min-height: 200px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    box-shadow: 0 0 5px #ccc;
  }
  .comps {
    width: 720px;
    min-height: 460px;
    background-color: #fff;
    padding: 20px;
    padding-bottom: 50px;
    box-shadow: 0 0 5px #ccc;
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
