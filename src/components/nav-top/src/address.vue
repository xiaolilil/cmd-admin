<template>
  <div class="address">
    <ul>
      <li @click="handleRoute('home')">
        <i class="iconfont icon-shouye"></i>
        <span class="home">好伙伴宠物首页</span>
      </li>

      <!-- <li>
        <i class="iconfont icon-tiexinshouhu_huaban1"></i>
        <span class="zp">好伙伴宠物都是正品</span>
      </li> -->
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const handleRoute = (path: string) => {
  router.push('/' + path)
}

// 地址
const address = ref('北京')
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.address {
  width: 450px;
  height: 35px;
  ul {
    height: 100%;
    display: flex;
    align-items: center;
    li {
      height: 100%;
      line-height: 35px;
      margin-right: 15px;
      display: flex;
      align-items: center;
      .home:hover {
        color: rgb(101, 69, 208);
      }
      .zp:hover {
        color: coral;
      }
    }
    li span {
      font-size: 13px;
      cursor: pointer;
    }
    .addressBox {
      width: 120px;
      position: relative;
      &:hover .iconfont {
        transform: rotate(180deg);
      }
      span {
        &:first-child {
          margin-right: 10px;
        }
        margin-right: 6px;
      }
      &:hover .address-box2 {
        display: block;
      }
    }
    .address-box2 {
      width: 450px;
      height: 100%;
      padding-bottom: 20px;
      border: 1px solid #ddd;
      position: absolute;
      left: 0;
      top: 35px;
      z-index: 100;
      display: none;
    }
  }
  .iconfont {
    color: @basic-color;
    margin-right: 2px;
  }
  .icon-tiexinshouhu_huaban1 {
    font-size: 23px;
    font-weight: bold;
  }
}
</style>
