<template>
  <div class="head">
    <span class="title">收获地址</span>
    <span @click="handleAdd" v-if="formData.name == ''" class="add"
      ><span>+</span>添加新地址</span
    >
  </div>

  <div class="address-box" v-if="formData.name != ''">
    <div class="address-top">
      <p>
        <span class="name">{{ formData.name }}</span
        ><span>收</span>
      </p>
      <p class="address">{{ formatAddress }}</p>
      <p>{{ formatPhone(formData.mobile) }}</p>
    </div>
    <div class="handle">
      <span @click="hadnleEdit">编辑</span>
      <span @click="handleDel">删除</span>
    </div>
  </div>

  <div class="empty" v-else>
    <el-empty description="您暂时还没有设置地址" />
  </div>

  <handle-address-dialog
    :dialog-visible="isShowDialog"
    :curr-title="currTilte"
    :is-show-default="false"
    :form-data="formData"
    @handle-colse="isShowDialog = false"
  ></handle-address-dialog>
</template>

<script lang="ts" setup>
import HandleAddressDialog from '@/components/handleAddressDialog/handleAddressDialog.vue'
import { useHandleAddress } from '@/hooks/useHandleAddress'

const {
  handleAdd,
  handleDel,
  hadnleEdit,
  currTilte,
  isShowDialog,
  formData,
  formatAddress,
  formatPhone,
} = useHandleAddress()
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.head {
  .flex;

  .add {
    span {
      color: red;
      font-weight: bold;
      font-size: 16px;
      margin-right: 3px;
    }
    font-size: 13px;
    cursor: pointer;
  }
}

.address-box {
  width: 90%;
  height: 160px;
  border: 1px solid #ddd;
  margin: 30px auto;
  .address-top {
    height: 120px;
    padding: 20px;
    p {
      margin-bottom: 10px;
    }
    p:first-child {
      font-size: 14px;
      .name {
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
  .handle {
    height: 40px;
    background-color: #ddd;
    line-height: 40px;
    text-align: right;
    span {
      margin-right: 30px;
      font-size: 12px;
      color: cornflowerblue;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
.empty {
}
</style>
