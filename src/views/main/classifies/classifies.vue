<template>
  <div class="classify">
    <!-- 搜索导航 -->
    <div class="search-navigator center">
      <p class="selected">
        <b class="label">已选条件:</b>
        <span>所有与 "{{ cateTypes[currIndex].label }}" 相关的宝贝</span>
      </p>
      <div class="type">
        <b class="label">类型:</b>
        <span
          v-for="(v, i) in cateTypes"
          :key="i"
          @click="handleCurrType(v, i)"
          :class="{ 'active-type': currType == v.type }"
          >{{ v.label }}</span
        >
      </div>
      <div class="age">
        <b class="label">适龄阶段:</b>
        <span
          @click="handleAge('全年龄')"
          :class="{ 'active-age': currAge == '全年龄' }"
          >全年龄</span
        >
        <span
          @click="handleAge('成龄')"
          :class="{ 'active-age': currAge == '成龄' }"
          >成龄</span
        >
        <span
          @click="handleAge('幼龄')"
          :class="{ 'active-age': currAge == '幼龄' }"
          >幼龄</span
        >
      </div>
    </div>
    <!-- 商品分类区域 -->
    <goods-list :list="newGoodsList"></goods-list>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
// import { getClassifyApi } from '@/apis/classify.js'
import { getClassifyGoodsApi } from '@/api/classify.js'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed } from 'vue'
import GoodsList from '@/components/goods-list/goods-list.vue'

import usePinia from '@/store'

const { goods } = usePinia()
const router = useRouter()
const route = useRoute()
const currAge = ref('') // 当前适龄阶段
const currType = ref('') // 当前展示的类型商品
const currTypes = ref(0)

const cateInfo = reactive({
  id: route.query?.id,
  title: route.query?.type,
})

// 计算商品ID对应的分类
const cateTypes = computed(() => {
  let data: any[] = []
  switch (cateInfo.id) {
    case '1':
      data = [
        { type: 'importGoods', label: '进口主粮', id: 1 },
        { type: 'domesticGoods', label: '国产主粮', id: 2 },
      ]
      currType.value = 'importGoods'
      break
    case '2':
      data = [
        { type: 'importGoods', label: '进口主粮', id: 1 },
        { type: 'domesticGoods', label: '国产主粮', id: 2 },
      ]
      currType.value = 'importGoods'
      break
    case '3':
      data = [
        { type: 'meatSnacks', label: '肉质零食', id: 3 },
        { type: 'canSnacks', label: '罐头湿粮', id: 4 },
      ]
      currType.value = 'meatSnacks'
      break
    case '4':
      data = [
        { type: 'meatSnacks', label: '肉质零食', id: 3 },
        { type: 'canSnacks', label: '罐头湿粮', id: 4 },
      ]
      currType.value = 'meatSnacks'
      break
    case '5':
      data = [
        { type: 'tooth', label: '磨牙玩具', id: 5 },
        { type: 'tour', label: '巡回玩具', id: 6 },
      ]
      currType.value = 'tooth'
      break
    case '6':
      data = [
        { type: 'tooth', label: '磨牙玩具', id: 5 },
        { type: 'tour', label: '巡回玩具', id: 6 },
      ]
      currType.value = 'tooth'
      break

    case '7':
      data = [{ type: 'clean', label: '宠物清洁', id: 7 }]
      currType.value = 'clean'
      break
    case '8':
      data = [
        { type: 'wash', label: '日常洗护', id: 8 },
        { type: 'comb', label: '梳剪工具', id: 9 },
      ]
      currType.value = 'wash'
      break
    case '9':
      data = [
        { type: 'wash', label: '日常洗护', id: 8 },
        { type: 'comb', label: '梳剪工具', id: 9 },
      ]
      currType.value = 'wash'
      break
    case '10':
      data = [{ type: 'clothes', label: '宠物服饰', id: 10 }]
      currType.value = 'clothes'
      break
    default:
      break
  }
  return data
})

// 获取商品数据
const goodsList = ref<any[]>([])
const newGoodsList = ref<any[]>([])
async function getClassifyGoods(id: any) {
  const { data: res } = await getClassifyGoodsApi({
    arr: JSON.stringify([id]),
  })
  // 商品分类原始数据
  goodsList.value = res
  // 传递给子组件的数据
  newGoodsList.value = res
}
getClassifyGoods(route.query.id)

// 当前选择的分类 商品
const currIndex = ref(0)
const handleCurrType = (obj: any, index: number) => {
  getClassifyGoods(obj.id)
  currType.value = obj.type
  currIndex.value = index

  currTypes.value = obj.id
  newGoodsList.value = goodsList.value[obj.type]
  // 每次点击分类， 把当前年龄情况
  currAge.value = ''
}

// 选择当前的年龄 筛选出对应年龄的数据
const handleAge = (age: string) => {
  currAge.value = age
  // newGoodsList.value = goodsList.value[currType.value].filter((i: any) => {
  //   return i.age == currAge.value
  // })

  newGoodsList.value = goodsList.value.filter((i: any) => {
    return i.commodityAge == currAge.value
  })
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.classify {
  height: 100%;
  padding: 20px 0;
  background: #f5f5f5;
  .search-navigator {
    padding: 15px;
    width: 1200px;
    background-color: #fff;
    border-radius: 20px;
    margin-bottom: 30px;
    .selected {
      background-color: #eee;
      height: 40px;
      line-height: 40px;
      border-radius: 10px;
      padding-left: 20px;
    }
    .type,
    .age {
      margin-top: 20px;
      padding-left: 20px;
      span {
        margin-right: 15px;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
    .active-type,
    .active-age {
      color: red;
    }
    .label {
      margin-right: 20px;
      width: 80px;
      display: inline-block;
      text-align: right;
    }
  }
}
</style>
