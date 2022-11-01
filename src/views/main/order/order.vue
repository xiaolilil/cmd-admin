<template>
  <div class="line"></div>

  <div class="order">
    <div class="username">
      <div class="title">
        <span>收货人信息</span>
        <div class="bd"></div>
        <button class="add" @click="handleAdd">
          <span>+</span>新增收货地址
        </button>
      </div>
      <div class="username-info" v-if="formData.name != ''">
        <p class="currInfo">
          <span>{{ formData.name }}</span>
          <span>{{ formData.address[0] }}</span>
        </p>
        <ul>
          <li class="address">{{ formatAddress }}</li>
          <li class="mobie">
            {{ formatPhone(formData.mobile) }}
          </li>
          <li class="default">默认地址</li>
          <li class="edit" @click="handleEdit">编辑</li>
        </ul>
      </div>
      <div class="empty" v-else>暂无地址信息</div>
    </div>
    <div class="pay-mode">
      <div class="title">
        <span>付款方式</span>
        <div class="bd"></div>
      </div>
      <div class="pay-info">
        <p>在线支付</p>
      </div>
    </div>
    <div class="delivery-mode">
      <div class="title">
        <span>配送方式</span>
        <div class="bd"></div>
      </div>
      <div class="delivery-info">
        <p class="active">京东快递</p>
      </div>
    </div>
    <div class="hr"></div>
    <div class="end">
      <button @click="submit">提交订单</button>
      <p class="price">
        应付总额: <b>￥{{ totalPrice + '.00' }}</b>
      </p>
    </div>
  </div>

  <handle-address-dialog
    :dialog-visible="isShowDialog"
    :curr-title="currTilte"
    :form-data="formData"
    :is-show-default="false"
    @handle-colse="isShowDialog = false"
  ></handle-address-dialog>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import HandleAddressDialog from '@/components/handleAddressDialog/handleAddressDialog.vue'
import { useHandleAddress } from '@/hooks/useHandleAddress'
import { useCountCartPrice } from '@/hooks/useCountCartPrice'
import { addOrderApi } from '@/api/order'

const router = useRouter()
const {
  handleAdd,
  handleEdit,
  formatPhone,
  formData,
  formatAddress,
  currTilte,
  isShowDialog,
  userId,
} = useHandleAddress('order')
// 商品总价
const { totalPrice, cart } = useCountCartPrice()

const submit = () => {
  cart.newData.map(async (i: any) => {
    const res = await addOrderApi({
      user_id: userId,
      goods_id: i.goods_id,
      order_address: formatAddress.value,
      order_state: 0,
      order_phone: formData.value.mobile,
    })
    if (res.code == '200') {
      cart.delNewData()
      router.push({
        name: 'pay',
      })
    }
  })
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.line {
  border-top: 3px solid @basic-color;
}
.order {
  width: 1200px;
  margin: 20px auto;
  .title {
    display: flex;
    align-items: center;
    margin: 25px 0;
    .add {
      border: 1px solid @basic-color;
      background-color: transparent;
      font-size: 13px;
      padding: 5px;
      cursor: pointer;
      span {
        color: red;
        font-weight: bold;
        margin-right: 3px;
      }
      &:hover {
        color: coral;
      }
    }
    span {
      color: #999;
      &:first-child {
        color: #000;
      }
    }
    .bd {
      flex: 1;
      height: 2px;
      background-color: #eee;
      margin: 0 5px;
    }
  }
  .username-info {
    display: flex;
    align-items: center;
    .currInfo {
      border: 2px solid @basic-color;
      font-size: 13px;
      padding: 5px 15px;
      span:first-child {
        margin-right: 10px;
      }
    }
    ul {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 20px;
      height: 29px;
      li {
        margin-right: 20px;
        font-size: 12px;
      }
      .default {
        background-color: @basic-color;
        color: #fff;
        padding: 3px 6px;
      }
      li:last-child {
        flex: 1;
        text-align: right;
        cursor: pointer;
        &:hover {
          color: cornflowerblue;
        }
      }
      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
  .pay-mode {
    .pay-info {
      border: 2px solid @basic-color;
      display: inline-block;
      padding: 6px 15px;
      font-size: 13px;
    }
  }
  .delivery-mode {
    .delivery-info {
      display: flex;
      align-items: center;
      p {
        padding: 6px 15px;
        font-size: 13px;
        border: 1px solid #999;
        margin-right: 30px;
      }
      .active {
        border: 2px solid @basic-color;
      }
    }
  }
  .hr {
    height: 1px;
    background-color: #ccc;
    margin: 25px 0;
  }
  .end {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      width: 200px;
      height: 46px;
      background-color: @basic-color;
      border: 0;
      color: #fff;
      border-radius: 6px;
      font-weight: bold;
      letter-spacing: 2px;
      &:hover {
        background-color: #91d47e;
      }
    }
    .price {
      line-height: 30px;
      margin-top: 10px;
      b {
        color: red;
        font-size: 25px;
      }
    }
  }
}
.el-form {
  .el-form-item {
    // display: flex;
    // align-items: center;
    // margin: 15px 0;
    padding-right: 100px;
    :deep(.el-form-item__label) {
      align-items: center;
      position: relative;
    }
    // :deep(.el-input__wrapper) {
    //   width: 300px;
    // }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    .save {
      width: 150px;
      height: 40px;
      background-color: @basic-color;
      border: 0;
      color: #fff;
    }
  }
}
.el-form-item.is-required:not(.is-no-asterisk).asterisk-left
  > .el-form-item__label-wrap
  > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk).asterisk-left
  > .el-form-item__label:before {
  content: '*';
  color: var(--el-color-danger);
  margin-right: 4px;
  margin-top: 4px;
}
:deep(.formAddress) {
  width: 332px;
  :deep(.el-input__wrapper) {
    width: 322px;
    padding: 1px 11px;
  }
}
</style>
