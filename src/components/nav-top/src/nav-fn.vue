<template>
  <div class="nav-fn">
    <ul>
      <li class="info">
        <span v-if="!token" @click="routerPush('login')">[登录]</span>
        <div v-else>
          <span>{{ username }}</span>
          <img class="avatar" :src="avatar" alt="" />
        </div>
      </li>
      <li v-if="!token">
        <span @click="routerPush('register')">[注册]</span>
      </li>
      <li class="logout" v-else @click="logOut">
        <span> [退出] </span>
      </li>

      <li class="user">
        <i class="iconfont icon-yonghu"></i>
        <span>我的好伙伴宠物</span>
        <i class="iconfont icon-xiajiantou"></i>
        <ul class="user-nav2">
          <li @click="skipPage('userInfo')">
            <i class="iconfont icon-yonghu"></i>
            <span>个人信息</span>
          </li>
          <li @click="skipPage('cart')">
            <i class="iconfont icon-gouwuche"></i>
            <span>购物车</span>
            <span class="number">({{ cart.goodsList.length }})</span>
          </li>
          <li @click="skipPage('viewOrder')">
            <i class="iconfont icon-dingdan"></i>
            <span>我的订单</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import usePinia from '@/store'
import { computed } from 'vue'
import LocalCache from '@/utils/cache'

const { user, cart } = usePinia()
const router = useRouter()
const routerPush = (path: string) => {
  router.push('/' + path)
}

const token = computed(() => LocalCache.getCache('pet-token'))
const username = computed(() => LocalCache.getCache('pet-username'))
const avatar = computed(() => LocalCache.getCache('pet-avatar'))

// 退出登录
const logOut = () => {
  router.push('/login')
  user.token = ''
  // 删除本地的用户信息
  LocalCache.deleteCache('pet-token')
  LocalCache.deleteCache('pet-userId')
  LocalCache.deleteCache('pet-uername')
  LocalCache.deleteCache('pet-savatar')
}

const skipPage = (path: string) => {
  router.push('/home/' + path)
  if (path == 'userInfo') router.push('/userInfo')
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.nav-fn {
  // width: 350px;
  height: 35px;
  > ul {
    display: flex;
    align-items: center;
    height: 100%;
    > li {
      margin-right: 18px;
      height: 100%;
      line-height: 35px;
      span {
        font-size: 13px;
        cursor: pointer;
      }
    }
    .logout:hover span {
      color: red;
    }
  }
  .info {
    div {
      .flex;
    }
  }
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .iconfont {
    margin-right: 3px;
  }
  .user {
    display: flex;
    align-items: center;
    position: relative;
    .iconfont {
      color: rgb(162, 160, 160);
      font-size: 16px;
    }
    &:hover {
      .icon-xiajiantou {
        transform: rotate(-180deg);
      }
    }
    &:hover .user-nav2 {
      display: block;
    }
    .user-nav2 {
      position: absolute;
      left: 0;
      top: 35px;
      background-color: #f8f8f8;
      width: 100%;
      height: 110px;
      z-index: 1000;
      display: none;
      li {
        display: block;
        line-height: 35px;
        padding-left: 15px;
        margin: 0;
        &:hover {
          background-color: cornflowerblue;
          color: #fff;
          .iconfont {
            color: #fff;
          }
        }
        span:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
