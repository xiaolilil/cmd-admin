<template>
  <div class="swiper">
    <img v-if="!swiperList.length" src="@/assets/home/swiper1.jpg" alt="" />
    <el-carousel
      v-else
      :interval="3000"
      height="370px"
      @change="changeSwiper($event)"
    >
      <el-carousel-item v-for="item in swiperList" :key="item.url">
        <img class="swiper-img" :src="item.url" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
// 接收父组件传递的数据
const props = withDefaults(
  defineProps<{
    swiperList: any[]
  }>(),
  {
    swiperList: () => [],
  },
)

// 子组件发送数据给父组件
const emit = defineEmits(['currItem'])

const changeSwiper = (i: any) => {
  emit('currItem', i)
}
</script>

<style lang="less" scoped>
.swiper {
  width: 50%;
}
:deep(.el-carousel--horizontal) {
  display: flex;
  justify-content: center;
}

:deep(.el-carousel__container) {
  width: 100%;
}

.swiper-img {
  width: 100%;
  height: 100%;
}
:deep(.el-carousel__arrow--left),
:deep(.el-carousel__arrow--right) {
  display: none;
}
</style>
