<template>
  <el-dialog
    v-model="dialogVisible"
    :before-close="handleClose"
    :title="currTitle"
    width="37%"
  >
    <el-form ref="formRef" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="收货人姓名:" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="所在地区:" prop="address">
        <el-cascader
          class="formAddress"
          placeholder="请选择省市区"
          v-model="form.address"
          :options="options"
          :props="selectProps"
        />
      </el-form-item>
      <el-form-item label="详细地址:" prop="detailsAddress">
        <el-input v-model="form.detailsAddress"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item v-if="isShowDefault">
        <el-checkbox
          v-model="form.isDefault"
          label="设为默认收货地址"
          size="large"
        />
      </el-form-item>
      <div class="btn-box">
        <el-button class="save" @click="saveAddress">保存收获地址</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import cityData from '@/utils/citydata'
import { ElForm } from 'element-plus'
import { checkMobile } from '@/utils/checkMobile'
import 'element-plus/theme-chalk/el-form.css'
import usePinia from '@/store'

const { cart } = usePinia()

const props = withDefaults(
  defineProps<{
    currTitle: string
    dialogVisible: boolean
    isShowDefault?: boolean
    formData: any
  }>(),
  { dialogVisible: false, isShowDefault: true },
)
const emits = defineEmits(['handleColse'])

// 校验规则
const rules = {
  name: [
    { required: true, message: '请填写收货人姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度应为2到5位', trigger: 'blur' },
  ],
  address: [{ required: true, message: '请选择收货地址', trigger: 'blur' }],
  detailsAddress: [
    { required: true, message: '请填写详细收货地址', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '请填写手机号码', trigger: 'blur' },
    {
      validator: checkMobile,
      message: '请输入正确的手机号码',
      trigger: 'blur',
    },
  ],
}

// 省市区数据
const options = cityData
const dialogVisible = ref(false)
const selectProps = {
  expandTrigger: 'click',
}

watch(
  () => props.dialogVisible,
  (n) => {
    if (n) {
      dialogVisible.value = true
    } else {
      dialogVisible.value = false
    }
  },
)
// 地址表单
let form = reactive({ ...props.formData })
watch(
  () => props.currTitle,
  (newData) => {
    if (newData === '新增收货地址') {
      form.name = ''
      form.mobile = ''
      form.detailsAddress = ''
      form.address = []
    }
  },
)

const formRef = ref<InstanceType<typeof ElForm>>()

// 保存地址
const saveAddress = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      cart.saveAddressData(form)
      dialogVisible.value = false
      emits('handleColse')
    }
  })
}

const handleClose = (done: () => void) => {
  dialogVisible.value = false
  emits('handleColse')
  form.name = props.formData.name
  form.mobile = props.formData.mobile
  form.detailsAddress = props.formData.detailsAddress
  form.address = props.formData.address
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
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
