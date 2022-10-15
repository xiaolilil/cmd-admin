<template>
  <div class="introduce">
    <ul>
      <li>
        <span>全场品牌特卖</span>
        <img class="img" src="@/assets/home/tm.png" alt="" />
      </li>
      <li>
        <span>全场品质保证 </span>
        <img class="img" src="@/assets/home/bz.png" alt="" />
      </li>
      <!-- <li>
        <span>品牌公益</span>
        <i class="iconfont icon-bianpinghuatubiaosheji- img"></i>
      </li> -->
    </ul>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.introduce {
  width: 220px;
  height: 370px;
  background-color: #fff;

  ul {
    padding: 10px 0;

    li {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      transition: all 0.4s;
      &:hover {
        transform: translateX(-15px);
      }
      span {
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
</style>
