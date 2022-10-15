<template>
  <div class="line"></div>
  <!-- 商品基本信息 -->
  <div class="goodsInfo">
    <div class="goods-parameter">
      <!-- 海报 -->
      <div class="goods-l">
        <img class="poster" :src="goodsInfo.imgUrl" alt="" />
      </div>
      <div class="goods-r">
        <h1>{{ goodsInfo.goods_name }}</h1>
        <!-- 活动 -->
        <div class="activity center">
          <div class="title">
            <span>此商品参与 "好伙伴宠物商城13周年限时抢" 活动 </span>
            <p>距离结束仅剩 <span class="day">30</span> 天</p>
          </div>
          <div class="price">
            <p>
              活动价 :
              <span class="dw">￥</span>
              <span class="new">{{ goodsInfo.newPrice }} </span>
              <span class="old">￥{{ goodsInfo.oldPrice }}</span>
            </p>
          </div>
        </div>
        <div class="dashed"></div>
        <!-- 数据 -->
        <div class="data center">
          <div class="data-t">
            <p>
              月销: <span>{{ goodsInfo.sales }}</span>
            </p>
            <p>
              评价:
              <span>({{ totalCount }})</span>
            </p>
          </div>
          <ul class="data-b">
            <li>
              <img src="@/assets/zp.png" alt="" />
              正品保证
            </li>
            <li>
              <img src="@/assets/by.png" alt="" />
              99元包邮
            </li>
            <li>
              <img src="@/assets/30th.png" alt="" />
              30天退货
            </li>
          </ul>
        </div>
        <div class="dashed"></div>
        <!-- 数量 -->
        <div class="number center">
          <span>我要买:</span>
          <el-input-number v-model="goodsNum" :min="1" @change="handleChange" />
          <span>件</span>
        </div>
        <!-- 地址 -->
        <div class="address center">
          <span>送货至:</span>
          <el-cascader
            placeholder="请选择省市区"
            v-model="address"
            :options="options"
            @change="handleChangeAddress"
          />
        </div>
        <div class="dashed"></div>
        <!-- 下单提示 -->
        <div class="tips center">
          <p>16点前下单，当天发货。</p>
        </div>
        <div class="btn center">
          <button class="submit" @click="addGoodsToCart">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 详情 评论 -->
  <div class="menu center">
    <ul>
      <li
        :class="{ 'active-menu': currName == 'GoodsDetailsImg' }"
        @click="changeModel('GoodsDetailsImg')"
      >
        <span>商品详情</span>
      </li>
      <li
        :class="{ 'active-menu': currName == 'GoodsEvaluate' }"
        @click="changeModel('GoodsEvaluate')"
      >
        <span
          >商品评论
          <span>({{ totalCount }})</span>
        </span>
      </li>
    </ul>
  </div>
  <!-- 商品详情 评论 组件 -->
  <div class="menu-model center">
    <component
      :is="componentConfig[currName]"
      :detailsData="detailsList"
      :goodsData="goodsData"
      :user="userList"
      @updateCount="updateCount"
    ></component>
  </div>

  <!-- 对话框 -->
  <el-dialog v-model="dialogVisible" width="35%">
    <div class="content">
      <img src="@/assets/buy_dog.gif" alt="" />
      <div class="tips">
        <p>恭喜小主 ,成功添加到购物车咯~</p>
        <p>
          购物车共有
          <span class="num">{{ goodsList.length }}</span> 件商品，合计：<span
            class="price"
            >{{ totalPrice }}</span
          >
          元
        </p>
        <div class="btns">
          <el-button @click="dialogVisible = false">继续购物</el-button>
          <el-button class="settlement" type="primary" @click="toCart"
            >立即结算</el-button
          >
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
// @ts-ignore
import { getClassifyApi } from '@/apis/goodsDetails.js'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import usePinia from '@/store'
import cityData from '@/utils/citydata'

import 'element-plus/theme-chalk/el-message-box.css'
import { useCountCartPrice } from '@/hooks/useCountCartPrice'
import { defineAsyncComponent } from 'vue'

const GoodsDetailsImg = defineAsyncComponent({
  // 加载函数
  loader: () => import('./components/goodsDetailsImg.vue'),
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
})
const GoodsEvaluate = defineAsyncComponent({
  // 加载函数
  loader: () => import('./components/goodsEvaluate.vue'),
  delay: 100,
})

// 子组件
const componentConfig = {
  GoodsDetailsImg: GoodsDetailsImg,
  GoodsEvaluate: GoodsEvaluate,
}

const { goods, user, cart } = usePinia()
const router = useRouter()

// 获取商品详情数据
const detailsList = ref<any[]>([])
const evaluate = ref<any[]>([])
const goodsInfo = ref<any>({})
const userList = ref([])
const goodsData = ref({})
const totalCount = ref(0)

async function getGoodsDetails() {
  const { data: res } = await getClassifyApi(goods.getGoodsInfo)
  goodsInfo.value = res
  detailsList.value = res.details
  evaluate.value = res.user.evaluate
  userList.value = res.user
  goodsData.value = res.goodsData

  // 评论总条数
  totalCount.value = res.user.length
}
getGoodsDetails()

// 商品数量
const goodsNum = ref(1)
const handleChange = (value: number) => {
  goodsNum.value = value
}

// 选择地址
const options = cityData
const address = ref<any[]>([])
const handleChangeAddress = (value: any) => {
  user.setAddress(value)
}

// 当前显示的模块 默认显示  商品详情
const currName = ref<string>('GoodsDetailsImg')
const changeModel = (menu: string) => {
  currName.value = menu
}

// 获取子组件传递来的数据
const updateCount = (num: number) => {
  totalCount.value = num
}

const dialogVisible = ref(false)
// 加入购物车
const addGoodsToCart = () => {
  // 商品数据对象
  const goodsData = {
    imgUrl: goodsInfo.value.imgUrl,
    num: goodsNum.value,
    price: goodsInfo.value.newPrice,
    address: address.value,
    goods_name: goodsInfo.value.goods_name,
    goods_id: goodsInfo.value.goods_id,
    isCheck: true,
    isPay: 0,
  }
  // 调用action 保存到pinia cart模块去
  cart.setGoodsList(goodsData)
  dialogVisible.value = true
}

// 解构 hooks 里面的数据
const { totalPrice, goodsList } = useCountCartPrice()

// 跳到购物车页面
const toCart = () => {
  dialogVisible.value = false
  router.push('/home/cart')
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.line {
  border-top: 3px solid @basic-color;
}
.goodsInfo {
  width: 1200px;
  margin: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #f8f8f8;
  .goods-parameter {
    display: flex;
    justify-content: space-between;
    height: 600px;
    .goods-l {
      .poster {
        width: 300px;
        height: 300px;
        border: 1px solid #ddd;
      }
    }
    .goods-r {
      width: 740px;
      height: 570px;
      h1 {
        font-size: 23px;
        padding-left: 35px;
        padding-right: 30px;
      }
      .activity {
        width: 660px;
        height: 130px;
        .title {
          height: 63px;
          background-image: url('@/assets/activty.png');
          background-size: 100% 63px;
          color: #fff;
          .flex;
          padding: 0 30px;
          box-sizing: border-box;
          .day {
            color: cornflowerblue;
            font-size: 26px;
          }
          p {
            line-height: 26px;
          }
        }
        .price {
          height: 55px;
          background-color: #f3f3f3;
          padding: 10px 0 0 30px;
          line-height: 40px;
          .dw {
            color: #e3393c;
            font-size: 20px;
          }
          .new {
            font-size: 34px;
            color: #e3393c;
            font-weight: bold;
            margin-right: 10px;
          }
          .old {
            text-decoration: line-through;
            color: rgb(135, 132, 132);
          }
        }
      }
      .dashed {
        width: 660px;
        border-top: 1px dashed @basic-color;
        margin: 20px auto;
      }
      .data {
        width: 660px;
        height: 80px;
        .data-t {
          display: flex;
          align-items: center;
          p:first-child {
            margin-right: 150px;
          }
          p span {
            color: #e3393c;
          }
        }
        .data-b {
          display: flex;
          align-items: center;
          margin-top: 35px;
          li {
            display: flex;
            align-items: center;
            margin-right: 30px;
            padding-right: 30px;
            font-size: 14px;
          }
          li:not(:last-child) {
            border-right: 1px solid #e3393c;
          }
          img {
            width: 20px;
            height: 20px;
            margin-right: 6px;
          }
        }
      }
      .number {
        width: 660px;
        margin-bottom: 20px;
        span {
          margin-right: 10px;
        }
        .el-input-number {
          margin-right: 10px;
        }
      }
      .address {
        width: 660px;
        display: flex;
        align-items: center;
        span {
          margin-right: 10px;
        }
      }
      .tips {
        width: 660px;
        font-size: 14px;
        color: rgb(133, 131, 131);
      }
      .btn {
        width: 660px;
        margin-top: 30px;
        .submit {
          width: 200px;
          height: 56px;
          background-color: @basic-color;
          border: 0;
          color: #fff;
          border-radius: 6px;
          cursor: pointer;
        }
      }
    }
  }
}
.menu {
  width: 1200px;
  margin-top: 30px;
  ul {
    display: flex;
    align-items: center;
    li {
      width: 100px;
      margin-right: 5px;
      line-height: 40px;
      text-align: center;
      height: 40px;
      border-top: 3px solid @basic-color;
      background-color: #ddd;
      cursor: pointer;
      span {
        font-size: 14px;
      }
    }
    .active-menu {
      background-color: #f8f8f8;
    }
  }
}
.menu-model {
  width: 1200px;
  height: 100%;
}
.content {
  display: flex;
  .tips {
    margin-left: 20px;
    p {
      color: #000;
      line-height: 30px;
      .num {
        font-size: 18px;
        color: red;
      }
      .price {
        font-size: 18px;
        color: red;
      }
    }
    .btns {
      margin-top: 20px;
      .el-button {
        height: 40px;
      }
      .settlement {
        background-color: @basic-color;
        border: 0;
      }
    }
  }
}
</style>
