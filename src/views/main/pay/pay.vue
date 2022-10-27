<!-- <template>
  <div class="pay">
    <div class="pay-top">
      <i class="iconfont icon-wancheng1"></i>
      <div class="pay-top-r">
        <div class="pay-info">
          <p class="msg">恭喜，订单提交成功!</p>
          <div class="order">
            <p>
              订单号： <span class="odd">{{ orderInfo.orderId }} </span>
              <span
                >订单中的商品，系统自动为您保留到 {{ orderInfo.deadline }}</span
              >
            </p>
            <p class="price">
              应付金额: <span>{{ orderInfo.totalPrice }}</span> 元
            </p>
          </div>
        </div>
        <div class="tips">
          近期网络诈骗案件频繁发生，但小宠打死都不会<span
            >因订单问题向您发送任何链接或获取验证码.</span
          >
        </div>
      </div>
    </div>
    <div class="pay-content">
      <div class="title">
        <p>
          普通订单付款 <b class="price">￥{{ orderInfo.totalPrice }}</b>
        </p>
        <p>
          <span>订单号: {{ orderInfo.orderId }}</span>
        </p>
      </div>
      <div class="zfb">
        <h3>平台支付 <span>推荐使用支付宝平台支付，安全快捷</span></h3>
        <div class="btn" @click="pay">
          <i class="iconfont icon-zhifubao1"></i>
          <p>
            <b>支付宝</b>
            <span>A L I P A Y</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading" class="spinner"></div>
  <el-result v-if="isShowRes" class="res" icon="success" title="支付成功">
  </el-result>
</template> -->
<!-- 
<script lang="ts" setup>
// @ts-ignore
import { placeOrderApi, orderPayApi } from '@/apis/order.js'
import LocalCache from '@/utils/cache'
import { ref } from 'vue'
import { useCountCartPrice } from '@/hooks/useCountCartPrice'
import { useRoute, useRouter } from 'vue-router'
import usePinia from '@/store'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()
const { cart } = usePinia()
const { goodsList, isCheckGoodsList, userAddress, theUnpaid } =
  storeToRefs(cart)
const { totalPrice, theUnpaidPrice } = useCountCartPrice()

const orderList = isCheckGoodsList.value
const allPrice = ref(0)
allPrice.value = totalPrice.value
if (route.path != 'home/order') {
  allPrice.value = theUnpaidPrice.value
}

// 获取订单信息
const orderInfo = ref<any>({})
const orderId = ref(0)
async function getOrderInfo() {
  const { data: res } = await placeOrderApi({
    goods: theUnpaid.value,
    total_price: allPrice.value,
  })
  orderInfo.value = res
  orderId.value = res.orderId
  // 保存到未支付订单去
  cart.saveUnpaidOrder({
    pay: totalPrice.value,
    goodsList: isCheckGoodsList.value,
    address: userAddress.value[0],
    orderId: orderId.value,
    isPay: 0,
    name: userAddress.value[0].name,
  })

  setTimeout(() => {
    goodsList.value = goodsList.value.filter((i) => {
      return i.isCheck != true
    })
  }, 500)
}
getOrderInfo()

const unpaidOrder = ref()
// 显示支付完成变量
const isShowRes = ref(false)
// 显示支付动画变量
const loading = ref(false)
const pay = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    isShowRes.value = true
    setTimeout(() => {
      isShowRes.value = false

      // 支付订单
      orderPayApi({
        pay: totalPrice.value,
        goods: isCheckGoodsList.value,
        address: userAddress.value[0],
        orderId: orderId.value,
      }).then((res: any) => {
        cart.savePaidOrder(res.data)
        router.push('/home/viewOrder')
        // 支付成功，把当前这个未支付的订单删除
        unpaidOrder.value = unpaidOrder.value.filter((i: any) => {
          return i.orderId != orderId.value
        })
        // console.log('unpaidOrder.value', unpaidOrder.value)
      })
    }, 1000)
  }, 3000)
}
</script>
 -->
<style lang="less" scoped>
@import '@/style/common.less';

.pay {
  width: 1200px;
  height: 100%;
  min-height: 420px;
  background-color: #f8f8f8;
  margin: 20px auto;
  padding: 30px;
  .pay-top {
    .flex(@align:start);
    padding: 0 20px;
    padding-bottom: 30px;
    border-bottom: 1px solid #999;
    .iconfont {
      color: @basic-color;
      font-size: 50px;
      font-weight: bold;
    }
    .pay-top-r {
      flex: 1;
      margin-left: 50px;
      .pay-info {
        .msg {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .order {
          .flex;
          p:first-child {
            font-size: 12px;
            color: #999;
            .odd:hover {
              color: blue;
              cursor: pointer;
            }
            span:last-child {
              color: red;
              margin-left: 50px;
            }
          }
          .price {
            color: rgb(103, 103, 103);
            span {
              color: red;
              font-size: 25px;
            }
          }
        }
      }
      .tips {
        font-size: 12px;
        margin-top: 20px;
        span {
          color: red;
        }
      }
    }
  }

  .pay-content {
    background-color: #fff;
    margin-top: 30px;
    height: 260px;
    padding: 30px;
    .title {
      display: flex;
      align-items: center;
      p:first-child {
        font-size: 13px;
        .price {
          color: red;
          font-size: 18px;
        }
      }
      p:last-child {
        font-size: 13px;
        margin-left: 200px;
        span:first-child {
          color: #999;
        }
        .see:hover {
          color: blue;
          cursor: pointer;
        }
      }
    }
    .zfb {
      border: 1px dashed #999;
      margin-top: 10px;
      padding-left: 50px;
      padding-bottom: 30px;
      padding-top: 20px;
      box-sizing: content-box;
      h3 {
        span {
          color: #999;
          font-size: 15px;
        }
      }
      .btn {
        width: 150px;
        height: 40px;
        border: 1px solid #ddd;
        margin-top: 20px;
        display: flex;
        padding: 10px 0 10px 20px;
        cursor: pointer;
        box-sizing: content-box;
        &:hover {
          border-color: @basic-color;
        }
        .iconfont {
          font-size: 37px;
          color: rgb(88, 146, 216);
        }
        p {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin-left: 5px;
          span {
            font-size: 12px;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.spinner {
  width: 100px;
  height: 100px;
  background-color: rgb(28, 196, 78);
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
  border-radius: 20px;
  position: fixed;
  left: 45%;
  top: 30%;
  transform: translate(-50%, -50%);
}
@-webkit-keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px);
  }

  50% {
    -webkit-transform: perspective(120px) rotateY(180deg);
  }

  100% {
    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }

  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }

  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
.res {
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
  background-color: #fff;
  width: 200px;
}
</style>
