<template>
  <ul class="cate-nav1">
    <li v-for="i in list" :key="i.type">
      <div class="nav-title">
        <span>{{ i.type }}</span>
        <img :src="i.imgUrl" alt="" />
      </div>
      <!-- <ul class="nav-list" v-for="child in i.children" :key="child.id"> -->
      <ul class="nav-list" v-for="child in i.classification" :key="child">
        <li @click="toClassify(i.cate_id, i.type)">{{ child }}</li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import usePinia from '@/store'

const { goods } = usePinia()

// 父组件需要传递才数据
const props = withDefaults(
  defineProps<{
    list: any[]
  }>(),
  {
    list: () => [],
  },
)

// 跳转到商品分类
const router = useRouter()
const toClassify = (cate_id: number, type: string) => {
  goods.setGoodsInfo({
    title: props.list[0].title,
    type: [props.list[0].type, props.list[1]?.type],
  })
  router.push({
    path: '/home/classifies',
    // 路由传参，把分类ID和类型传过去
    query: {
      cate_id,
      // type,
    },
  })
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.cate-nav1 {
  margin-left: 50px;
  margin-bottom: 10px;
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
        margin-left: 5px;
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
</style>
