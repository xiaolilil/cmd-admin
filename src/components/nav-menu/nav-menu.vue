<template>
  <div class="nav-menu">
    <ul class="menu">
      <li
        v-for="v in list"
        :key="v.idx"
        :class="{ activeMenu: currMenu == v.label }"
        @click="handleMenu(v)"
      >
        {{ v.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    list: any[]
  }>(),
  {
    list: () => [],
  },
)

const emits = defineEmits(['updateMenu'])

const currMenu = ref('全部订单')
const handleMenu = (obj: any) => {
  currMenu.value = obj.label
  emits('updateMenu', obj.idx)
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.nav-menu {
  width: 1200px;
  height: 50px;
  .menu {
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-left: 0;
    li {
      width: 130px;
      height: 40px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      margin-right: 10px;
      border: 1px solid #ddd;
      border-top: 2px solid #ddd;
      box-sizing: border-box;
      cursor: pointer;
      list-style: none;
    }
    .activeMenu {
      border-top: 2px solid @basic-color;
      color: #03c97c;
    }
  }
}
</style>
