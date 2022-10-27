<template>
  <span class="title">修改密码</span>
  <div class="line"></div>
  <el-form
    ref="formRef"
    :model="passwordObj"
    label-width="120px"
    :rules="rules"
  >
    <el-form-item label="旧密码" prop="oldPwd">
      <el-input v-model="passwordObj.userId" show-password />
    </el-form-item>
    <el-form-item label="新密码" prop="userPwd">
      <el-input v-model="passwordObj.userPwd" show-password />
    </el-form-item>

    <el-button @click="submit(formRef)">修改密码</el-button>
  </el-form>

  <Dialog :text="text" :is-show="isShow" @update-dialog="updateDialog" />
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import usePinia from '@/store'
import { changePwdApi } from '@/api/userInfo'
import Dialog from '@/components/dialog/dialog.vue'

const { user } = usePinia()
const formRef = ref<FormInstance>()

const passwordObj = reactive({
  userId: user.userId,
  userPwd: '',
})

const rules = {
  userPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
}

const text = ref('')
const isShow = ref(false)
// 提交修改密码
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const { data: res } = await changePwdApi(passwordObj)
      isShow.value = true
      text.value = res.message

      passwordObj.userPwd = ''
    } else {
      console.log('error submit!', fields)
    }
  })
}

const updateDialog = () => {
  isShow.value = false
}
</script>
<style lang="less" scoped>
.title {
  font-size: 20px;
  color: #1fac75;
}
.line {
  width: 100%;
  height: 2px;
  background-color: #1fac75;
  margin: 10px 0;
  margin-bottom: 30px;
}

.el-input {
  width: 200px;
}
.el-button {
  width: 120px;
  height: 40px;
  margin-top: 20px;
  margin-left: 120px;
  background-color: #1fac75;
  color: #fff;
  border: none;
  &:hover {
    background-color: #1fac75;
  }
}
</style>
