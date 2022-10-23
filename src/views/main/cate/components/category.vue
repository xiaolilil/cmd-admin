<template>
  <div class="category">
    <ul>
      <li class="cate-item">
        <span>主粮</span>
        <span>零食</span>
        <div class="cate-box2">
          <div>
            <p>宠物主粮</p>
            <cate-list :list="foodStuffList"></cate-list>
          </div>
          <div>
            <p>宠物零食</p>
            <cate-list :list="snacksList"></cate-list>
          </div>
        </div>
      </li>
      <li class="cate-item">
        <span>玩具</span>
        <span>清洁</span>
        <div class="cate-box2">
          <div>
            <p>宠物玩具</p>

            <cate-list :list="toysList"></cate-list>
          </div>
          <div>
            <p>宠物清洁</p>

            <cate-list :list="cleanList"></cate-list>
          </div>
        </div>
      </li>
      <li class="cate-item">
        <span>洗澡</span>
        <span>服饰</span>
        <div class="cate-box2">
          <div>
            <p>洗澡美容</p>
            <cate-list :list="washList"></cate-list>
          </div>
          <div>
            <p>宠物服饰</p>
            <cate-list :list="clothesList"></cate-list>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { getHomeCategoryApi } from '@/api/home'
import { ref } from 'vue'
import CateList from './cate-list.vue'

// 获取分类主粮
const foodStuffList = ref<any[]>([])
async function getCateFoodStuff() {
  const { data: res } = await getHomeCategoryApi({ str: '宠物主粮' })
  res.forEach((i: any) => {
    i.classification = i.classification.split(',')
  })
  foodStuffList.value = res
}
getCateFoodStuff()

// 获取分类零食
const snacksList = ref<any[]>([])
async function getCateSnacks() {
  const { data: res } = await getHomeCategoryApi({ str: '宠物零食' })
  res.forEach((i: any) => {
    i.classification = i.classification.split(',')
  })
  snacksList.value = res
}
getCateSnacks()

// 获取分类玩具
const toysList = ref<any[]>([])
async function getCateToys() {
  const { data: res } = await getHomeCategoryApi({ str: '宠物玩具' })
  res.forEach((i: any) => {
    i.classification = i.classification.split(',')
  })
  toysList.value = res
}
getCateToys()

// 获取分类清洁
const cleanList = ref<any[]>([])
async function getCateClean() {
  const { data: res } = await getHomeCategoryApi({ str: '宠物清洁' })
  res.forEach((i: any) => {
    i.classification = i.classification.split(',')
  })
  cleanList.value = res
}
getCateClean()

// 获取分类洗护
const washList = ref<any[]>([])
async function getCateWash() {
  const { data: res } = await getHomeCategoryApi({ str: '宠物洗护' })
  res.forEach((i: any) => {
    i.classification = i.classification.split(',')
  })
  washList.value = res
}
getCateWash()

// 获取分类服饰
const clothesList = ref<any[]>([])
async function getCateClothes() {
  const { data: res } = await getHomeCategoryApi({ str: '宠物服饰' })
  res.forEach((i: any) => {
    i.classification = i.classification.split(',')
  })
  clothesList.value = res
}
getCateClothes()
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.category {
  width: 220px;
  height: 370px;
  background-color: #fff;
  > ul {
    width: 100%;
    height: 100%;
    position: relative;
    .cate-item {
      width: 100%;
      height: 80px;
      .flex(space-evenly);
      cursor: pointer;
      background-color: #fff;
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      &:hover {
        background-color: #fff;

        border-top: 1px solid @basic-color;
        border-bottom: 1px solid @basic-color;
        .cate-box2 {
          display: block;
        }
        &::after {
          content: '';
          width: 3px;
          height: 80px;
          float: right;
          margin-right: -2px;
          position: relative;
          z-index: 1100;
          background-color: #fff;
        }
      }
      span {
        flex: 1;
        height: 100%;
        text-align: center;
        line-height: 80px;
      }
      span:hover {
        color: @basic-color;
      }
      .cate-box2 {
        width: 400px;
        height: 260px;
        position: absolute;
        left: 100%;
        top: 0;
        z-index: 1000;
        background-color: #fff;
        padding: 20px 0;
        border: 1px solid @basic-color;
        display: none;
      }
    }
  }
}
.cate-box2 {
  div p {
    font-weight: bold;
    margin-left: 40px;
  }
  .cate-nav1 {
    margin-left: 50px;
    li {
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      .nav-title {
        width: 115px;
        .flex(start);
        img {
          width: 23px;
          height: 25px;
        }
      }
      .nav-list {
        margin-left: 16px;
        .flex(start);
        li {
          height: 18px;
          border-left: 1px solid #000;
          padding-left: 8px;
          font-size: 14px;
          &:hover {
            color: @basic-color;
          }
        }
      }
    }
  }
}
</style>
