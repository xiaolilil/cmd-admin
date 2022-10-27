<template>
  <div class="line"></div>
  <!-- 商品基本信息 -->
  <div class="goodsInfo">
    <div class="goods-parameter">
      <!-- 海报 -->
      <div class="goods-l">
        <img class="poster" :src="goodsInfo.commodityImgUrl" alt="" />
      </div>
      <div class="goods-r">
        <h1>{{ goodsInfo.commodityName }}</h1>
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
              <span class="new">{{ goodsInfo.commodityNewPrice }} </span>
              <span class="old">￥{{ goodsInfo.commodityOldPrice }}</span>
            </p>
          </div>
        </div>
        <div class="dashed"></div>
        <!-- 数据 -->
        <div class="data center">
          <div class="data-t">
            <p>
              月销: <span>{{ goodsInfo.commoditySales }}</span>
            </p>
            <p>
              评价:
              <span>({{ commentTotal }})</span>
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
        :class="{ 'active-menu': currName == 'GoodsComment' }"
        @click="changeModel('GoodsComment')"
      >
        <span
          >商品评论
          <span>({{ commentTotal }})</span>
        </span>
      </li>
    </ul>
  </div>
  <!-- 商品详情 评论 组件 -->
  <div class="menu-model center">
    <component
      :is="componentConfig[currName]"
      :goodsData="goodsData"
      :commentList="commentList"
      :id="id"
      @addComment="addComment"
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

  <Dialog
    icon="icon-cuowu"
    text="您当前还未登录，请登录后再进行添加到购物车!"
    :isShow="tipsDialogVisible"
    @updateDialog="updateDialog"
  />
</template>

<script lang="ts" setup>
// @ts-ignore
// import { getClassifyApi } from '@/apis/goodsDetails.js'
import {
  getGoodsDataApi,
  getCommentApi,
  addCommentApi,
  addCartApi,
} from '@/api/goodsDetails'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, defineAsyncComponent } from 'vue'
import usePinia from '@/store'
import cityData from '@/utils/citydata'
import 'element-plus/theme-chalk/el-message-box.css'
import { useCountCartPrice } from '@/hooks/useCountCartPrice'
import Dialog from '@/components/dialog/dialog.vue'

const GoodsDetailsImg = defineAsyncComponent({
  // 加载函数
  loader: () => import('./components/goodsDetailsImg.vue'),
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 50,
})
const GoodsComment = defineAsyncComponent({
  // 加载函数
  loader: () => import('./components/comment.vue'),
  delay: 100,
})

// 子组件
const componentConfig = {
  GoodsDetailsImg: GoodsDetailsImg,
  GoodsComment: GoodsComment,
}

const { user, cart } = usePinia()
const router = useRouter()
const route = useRoute()
// 商品id
const id = Number(route.query.id)

// 获取商品详情数据
const goodsData = ref<any>({})
const goodsInfo = ref<any>({})
// 获取商品详情
async function getGoodsDetails() {
  const { data: res } = await getGoodsDataApi({ id: id })
  goodsInfo.value = res[0]

  // 底部商品详情区域数据
  goodsData.value = {
    brand: res[0].brand,
    origin: res[0].origin,
    place: res[0].place,
    donation: res[0].donation,
    donationTotal: res[0].donationTotal,
    details: res[0].details.split(','),
    commodityAge: res[0].commodityAge,
  }
}
getGoodsDetails()

const commentTotal = ref(0)
const commentList = ref<any[]>([])
// 获取商品评论
async function getCommentList() {
  const { data: res } = await getCommentApi({
    commodityMessageId: Number(route.query.id),
  })
  commentList.value = res
  commentTotal.value = res.length
}
getCommentList()

// 获取子组件传递来的数据
const addComment = async (obj: any) => {
  // 添加评论
  await addCommentApi(obj)
  getCommentList()
}

// 商品数量
const goodsNum = ref(1)
const handleChange = (value: number) => {
  goodsNum.value = value
}

// 选择地址
const options = cityData
const address = ref<any[]>([])
const handleChangeAddress = (value: any) => {
  // 保存地址到 pinia
  cart.saveUserAddress(value)
}

// 当前显示的模块 默认显示  商品详情
const currName = ref<string>('GoodsDetailsImg')
const changeModel = (menu: string) => {
  currName.value = menu
}

const tipsDialogVisible = ref(false)
const dialogVisible = ref(false)
// 加入购物车
const addGoodsToCart = async () => {
  if (!user.isLogin) {
    tipsDialogVisible.value = true
    return
  } else {
    const res = await cart.addCart(id)
    if (res) {
      dialogVisible.value = true
    } else {
      return
    }
    // await addCartApi({ user_id: user.userId, goods_id: id })
  }
}
const updateDialog = () => {
  tipsDialogVisible.value = false
  router.push('/login')
}
/*
  测试接口
// getCartApi({ user_id: user.userId })
// removeCartApi({ user_id: user.userId, goods_id: id })
// clearCartApi({ user_id: user.userId })

// addOrderApi({
//   user_id: user.userId,
//   order_state: 1,
//   order_address: 'asdas',
//   order_phone: '11111',
//   goods_id: id,
// })

// getOrderApi({ user_id: user.userId, order_state: 1 })
// removeOrderApi({ order_id: 6 })
 */

// 解构 hooks 里面的数据
const { cartTotalPrice, totalPrice, goodsList } = useCountCartPrice()

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
  margin-bottom: 30px;
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
