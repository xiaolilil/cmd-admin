<template>
  <div class="footer">
    <!-- 头部介绍 -->
    <div class="foot-top">
      <ul class="foot-top-content center">
        <li>
          <div class="img"></div>
          <h3>优质服务</h3>
        </li>
        <li>
          <div class="img"></div>
          <h3>正品保障</h3>
        </li>
        <li>
          <div class="img"></div>
          <h3>品类丰富</h3>
        </li>

        <li>
          <div class="img"></div>
          <h3>科学养宠</h3>
        </li>

        <li>
          <div class="img"></div>
          <h3>爱宠12年</h3>
        </li>
        <li>
          <div class="img"></div>
          <h3>宠物公益</h3>
        </li>
      </ul>
    </div>
    <!-- 底部容器 -->
    <div class="foot-wrapper center">
      <div class="foot-support">
        <img src="@/assets/common/12315.png" alt="" />
        <img src="@/assets/common/baiq.png" alt="" />
        <img src="@/assets/common/bhdw.png" alt="" />
      </div>
      <div class="foot-copy">
        <ul>
          <li>川ICP备10102905号-1</li>
          <li>川ICP备10202905号-3</li>
          <li>Copyright © 2007-2022</li>
          <li>四川好伙伴宠物科技有限公司</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
@import '@/style/common.less';
.footer {
  height: 100%;
  background-color: #eee;
  .foot-top {
    border-bottom: 1px solid #ccc;
    .foot-top-content {
      width: 1200px;
      .flex;
      li {
        display: flex;
        align-items: center;
        line-height: 100px;
        transition: all 0.8s;
        cursor: pointer;
        .img {
          width: 70px;
          height: 62px;
          background-image: url('../assets/common/foot-logo.png');
          background-repeat: no-repeat;
        }
        &:hover {
          transform: translateY(-10px);
          h3 {
            color: red;
          }
        }
        &:nth-child(1) .img {
          background-position: 0 -243px;
        }
        &:nth-child(2) .img {
          background-position: 0 0;
        }
        &:nth-child(3) .img {
          background-position: 0 -161px;
        }
        &:nth-child(4) .img {
          background-position: 0 -81px;
        }
        &:nth-child(5) .img {
          background-position: 0 -402px;
        }
        &:nth-child(6) .img {
          background-position: 0 -322px;
        }
      }
    }
  }
  .foot-wrapper {
    height: 100px;
    width: 1200px;
    padding-top: 20px;
    .foot-support {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100px;
        height: 30px;
        margin: 0 30px;
      }
    }
    .foot-copy {
      margin-top: 30px;
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          margin: 0 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
