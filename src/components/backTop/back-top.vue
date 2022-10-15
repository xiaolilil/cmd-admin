<template>
  <div class="back-top" v-show="isShow" @click="backTop">
    <i class="iconfont icon-fanhuidingbu"></i>
    <span>顶部</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const isShow = ref(false)
onMounted(() => {
  window.addEventListener('scroll', scrollToTop)
})
let timer: any = null
function backTop() {
  timer = setInterval(function () {
    let backTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    let speedTop = backTop / 10
    document.documentElement.scrollTop = backTop - speedTop
    if (backTop === 0) {
      clearInterval(timer)
    }
  }, 10)
}
function scrollToTop() {
  let pageLookHeight =
    document.documentElement.clientHeight || document.body.clientHeight
  let scroll = document.documentElement.scrollTop
  isShow.value = scroll >= pageLookHeight * 0.618
}
</script>

<style lang="less" scoped>
.back-top {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 10px;
  bottom: 30px;
  cursor: pointer;
  .iconfont {
    color: #63ab4f;
    font-weight: bold;
    font-size: 20px;
  }
  span {
    font-size: 15px;
    line-height: 18px;
    zoom: 70%;
    color: #000;
  }
}
</style>
