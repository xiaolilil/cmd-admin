<template>
  <div class="line"></div>
  <div class="carts" v-if="newData.length">
    <table>
      <tr v-for="v in newData" :key="v.goods_id">
        <td>
          <el-checkbox v-model="v.isCheck" label="" size="large" />
        </td>
        <td class="img">
          <img :src="v.commodityImgUrl" alt="" />
        </td>
        <td class="goodsname">
          <span>{{ v.commodityName }}</span>
        </td>

        <td>
          <el-input-number
            v-model="v.num"
            :min="1"
            @change="handleChangeNum(v.num, v)"
          />
        </td>
        <td>
          <b>￥{{ v.commodityNewPrice }}</b>
        </td>
        <td>
          <el-button type="info" plain @click="handleGoodsItem(v)"
            >删除</el-button
          >
        </td>
      </tr>
    </table>
  </div>
  <div class="res" v-if="newData.length">
    <el-checkbox
      v-model="isAllCheck"
      label="全选"
      size="large"
      @change="changeAllCheck"
    />
    <span class="del" @click="handleDel">[ 删除选中商品 ]</span>
    <p class="total">
      <span>总价:</span>
      <b>{{ totalPrice }}</b>
    </p>
    <el-button @click="toOrder">去结算</el-button>
  </div>

  <!-- 空购物车 -->
  <div class="empty" v-if="!newData.length">
    <img src="@/assets/null-cart.png" alt="" />
    <div class="tips">
      <h2>您购物车空空的，快去选购吧！</h2>
      <button @click="toHome">去首页</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import usePinia from '@/store'
import { storeToRefs } from 'pinia'
import LocalCache from '@/utils/cache'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import { useCountCartPrice } from '@/hooks/useCountCartPrice'

// 总价
const { totalPrice } = useCountCartPrice()
const token = LocalCache.getCache('pet-token')
const router = useRouter()
const { cart } = usePinia()
const { goodsList, newData } = storeToRefs(cart)

const handleChangeNum = (val: number, obj: any) => {
  obj.num = val
}

// 全选
const isAllCheck = ref(true)
const changeAllCheck = (val: boolean) => {
  isAllCheck.value = val
  goodsList.value.forEach((i) => {
    i.isCheck = !i.isCheck
  })
}

// 删除单个商品
const handleGoodsItem = (obj: any) => {
  cart.delCartGoods(obj.goods_id)
  newData.value = newData.value.filter((i) => i.goods_id !== obj.goods_id)
}

// 删除所有商品
const handleDel = () => {
  ElMessageBox.alert('确定删除选中商品吗?', '好伙伴宠物商城提示', {
    confirmButtonText: '确定',
    callback: (action: any) => {
      if (action == 'confirm') {
        goodsList.value = []
        ElMessage({
          type: 'info',
          message: `删除商品成功`,
        })
      } else {
        ElMessage({
          type: 'info',
          message: `已取消删除`,
        })
      }
    },
  })
}

// 去首页
const toHome = () => {
  router.push('/home')
}

// 去订单页面
const toOrder = () => {
  // cart.deleteUnpaid()
  // 如果未登录，就提示登录后再进行操作
  if (!token) {
    ElMessageBox.alert('当前你还未登录，请登录后再进行购买', '提示', {
      confirmButtonText: 'OK',
      callback: (action: any) => {
        if (action == 'confirm') router.push('/login')
      },
    })
  } else {
    cart.changeCurrSteps(1)
    router.push('/home/order')
    // const res = goodsList.value.filter((i) => {
    //   return i.isCheck === true
    // })
    // if (res) {
    //   // cart.setCheckGoosList(res)
    //   // cart.changeCurrSteps(1)
    //   // router.push('/home/order')
    // }
  }
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.line {
  border-top: 3px solid @basic-color;
}
.carts {
  width: 1200px;
  height: 100%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  table {
    tr {
      height: 130px;

      td:not(:last-child) {
        margin-right: 30px;
      }
      td {
        padding: 0 38px;
        border-bottom: 1px solid #ccc;
      }

      .img img {
        width: 80px;
        height: 80px;
        border: 1px solid #ccc;
      }
      .goodsname {
        width: 400px;
        font-size: 13px;
      }
    }
  }
}
.res {
  width: 1200px;
  height: 60px;
  margin: 20px auto;
  padding: 0 20px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  position: relative;
  .del {
    margin-left: 60px;
    font-size: 13px;
    color: rgb(104, 102, 102);
    cursor: pointer;
  }
  .total {
    margin-left: 600px;
    span {
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .el-button {
    height: 60px;
    width: 200px;
    background-color: @basic-color;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    right: 0;
  }
}

.empty {
  height: 400px;
  width: 1200px;
  margin: auto;
  .flex(center);
  .tips {
    h2 {
      font-size: 35px;
      font-weight: 500;
      color: #999;
      margin: -10px 0 10px 0;
    }
    button {
      width: 100px;
      height: 40px;
      background-color: @basic-color;
      border: 0;
      color: #fff;
      border-radius: 6px;
      cursor: pointer;
    }
  }
}
</style>
