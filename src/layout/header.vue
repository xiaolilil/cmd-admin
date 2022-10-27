<template>
  <div class="login-top">
    <div class="login-top-content center">
      <img
        class="logo"
        @click="router.push('/home')"
        src="@/assets/common/logo.webp"
        alt=""
      />
      <ul class="login-top-r">
        <li>
          <i class="iconfont icon-zhengpinbaozhangxian"></i>
          <span>100%正品</span>
        </li>
        <li>
          <i class="iconfont icon-7tianwuliyoutuihuo"></i>
          <span>7天放心退</span>
        </li>
        <li>
          <i class="iconfont icon-xianshiqianggou"></i>
          <span>限时抢购</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.login-top {
  .login-top-content {
    width: 1000px;
    height: 150px;
    .flex;
    .logo {
      width: 125px;
      height: 130px;
      border-radius: 20px;
    }
    .login-top-r {
      .flex;
      li {
        margin: 0 20px;
        .flex;
        .iconfont {
          color: @basic-color;
          font-weight: bold;
          font-size: 30px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
