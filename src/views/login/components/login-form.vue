<template>
  <div class="login-form">
    <el-form class="form" ref="formRef" :rules="rules" :model="account">
      <h2>账户登录</h2>
      <el-form-item class="form-item" prop="petName">
        <i class="iconfont icon-yonghu"></i>
        <el-input v-model="account.petName" placeholder="请输入账号"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item class="form-item" prop="petPwd">
        <i class="iconfont icon-mima"></i>
        <el-input
          v-model="account.petPwd"
          type="password"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- 记住密码 -->
      <div class="control">
        <el-checkbox v-model="iskeepPassword">记住密码</el-checkbox>
        <el-link type="primary" @click="forgetPwd">忘记密码</el-link>
      </div>

      <el-button class="loginBtn" @click="handleLogin" type="success"
        >登录</el-button
      >
      <div class="toRegister" @click="toRegister">还没有账号，去注册</div>
    </el-form>
  </div>

  <!-- 弹窗 -->
  <Dialog
    :text="dialogText"
    :is-show="isShowDialog"
    @update-dialog="updateDialog"
  ></Dialog>
</template>

<script lang="ts" setup>
// mock 请求数据
// import { loginApi } from '@/apis/user.js'
// @ts-ignore  node 请求数据
import { loginApi } from '@/api/user'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import localCache from '@/utils/cache'
import { rules } from '@/config/form-rules'
import { ElForm } from 'element-plus'
import usePinia from '@/store'
import Dialog from '@/components/dialog/dialog.vue'

const { user, cart } = usePinia()
const router = useRouter()
const iskeepPassword = ref(true) // 是否记住密码
// 是否显示 弹窗
const isShowDialog = ref(false)
// 弹窗显示文本内容
const dialogText = ref('')

// 用户信息 先从本地获取，没有就为空，有值就用本地的
const account = reactive({
  petName: localCache.getCache('petName') ?? '',
  petPwd: localCache.getCache('petPwd') ?? '',
})

const formRef = ref<InstanceType<typeof ElForm>>()
// 登录
const handleLogin = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1. 登录之前判断是否需要记住密码
      if (iskeepPassword.value) {
        // 本地缓存
        localCache.setCache('petName', account.petName)
        localCache.setCache('petPwd', account.petPwd)
      } else {
        localCache.deleteCache('petName')
        localCache.deleteCache('petPwd')
      }
      // 2. 发起登录请求
      loginApi(account).then((res: any) => {
        if (res.code == '200') {
          localCache.setCache('pet-token', res.data.token)
          // 调用 pinia 的方法，把用户信息保存到 pinia
          user.setUserInfo(res.data)
          // 获取当前用户购物车的数据
          cart.getCart()
          // 跳转到首页
          router.push('/home')
        } else {
          dialogText.value = res.data.message
          isShowDialog.value = true
        }
      })
    }
  })
}

const updateDialog = (val: boolean) => {
  isShowDialog.value = val
}

// 忘记密码
const forgetPwd = () => {
  iskeepPassword.value = false
  localCache.deleteCache('petName')
  localCache.deleteCache('petPwd')
}

// 去登录页
const toRegister = () => {
  router.push('/register')
}
</script>

<style lang="less" scoped>
@import '../../../style/common.less';
.login-form {
  height: 550px;
  background-image: url(@/assets/bg.jpg);
  padding: 0 12%;
  &::before {
    content: '';
  }
  .flex;

  .form {
    width: 400px;
    height: 360px;
    padding: 0 40px;
    box-sizing: border-box;
    background-color: #f8f8f8;
    box-shadow: 0 0 15px #ccc;
    border-radius: 20px;
    h2 {
      text-align: center;
      color: rgb(37, 88, 208);
      line-height: 80px;
    }
    .form-item {
      margin-bottom: 22px;
    }
    :deep(.el-form-item__content) {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // flex-wrap: wrap;
      background-color: #fff;
      border: 1px solid @basic-color;
      position: relative;
      .iconfont {
        color: #ccc;
        margin-left: 5px;
      }
      .icon-mima {
        font-weight: bold;
        font-size: 22px;
      }
      .el-input {
        width: 90%;
      }
      .el-input__wrapper {
        border: 0 !important;
        box-shadow: none;
      }
      .el-form-item__error {
        position: absolute;
        left: 0;
        bottom: -17px;
        font-size: 13px;
        color: red;
      }
    }

    .control {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .agree {
      margin-top: 15px;
      span {
        color: red;
      }
    }
    .loginBtn {
      width: 100%;
      height: 40px;
      margin-top: 30px;
    }
    .toRegister {
      margin-top: 20px;
      text-align: right;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: blue;
      }
    }
  }
}
</style>
