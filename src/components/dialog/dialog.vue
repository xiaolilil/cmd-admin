<template>
  <div class="dialog" v-if="showDialog">
    <div class="content">
      <p class="text">
        <i class="iconfont" :class="icon"></i>
        {{ text }}
      </p>
      <button @click="confirm">确定</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const props = withDefaults(
  defineProps<{
    text: string
    isShow: boolean
    icon?: string
  }>(),
  { isShow: false },
)
const emits = defineEmits(['updateDialog'])

const showDialog = ref(false)
watch(
  () => props.isShow,
  (n) => {
    showDialog.value = n
  },
)

// 通知父组件关闭弹窗
const confirm = () => {
  emits('updateDialog', false)
}
</script>

<style lang="less" scoped>
.dialog {
  width: 100vw;
  height: 100vh;
  background: rgba(62, 61, 61, 0.447);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  .content {
    width: 25%;
    height: 20%;
    background-color: #f6f6f6;
    border-radius: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
    .iconfont {
      font-size: 25px;
    }
    .text {
      padding: 20px;
      line-height: 30px;
      text-align: left;
      font-size: 18px;
      color: red;
    }
    button {
      width: 80px;
      height: 30px;
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      border: 0;
      background-color: cornflowerblue;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
