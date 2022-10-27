<template>
  <div class="line"></div>

  <div class="order">
    <div class="username">
      <div class="title">
        <span>收货人信息</span>
        <div class="bd"></div>
        <button class="add" @click="handleAdd">
          <span>+</span>新增收货地址
        </button>
      </div>
      <div class="username-info" v-if="newUserAddress">
        <p class="currInfo">
          <span>{{ newUserAddress?.name }}</span>
          <span>{{ newUserAddress?.address[0] }}</span>
        </p>
        <ul>
          <li class="address">{{ newUserAddress?.newAddress }}</li>
          <li class="mobie">
            {{
              newUserAddress?.mobile
                ? newUserAddress?.mobile.replace(
                    /(\d{3})(\d{4})(\d{4})/,
                    '$1****$3',
                  )
                : ''
            }}
          </li>
          <li class="default">默认地址</li>
          <li class="edit" @click="handleEdit">编辑</li>
        </ul>
      </div>
    </div>
    <div class="pay-mode">
      <div class="title">
        <span>付款方式</span>
        <div class="bd"></div>
      </div>
      <div class="pay-info">
        <p>在线支付</p>
      </div>
    </div>
    <div class="delivery-mode">
      <div class="title">
        <span>配送方式</span>
        <div class="bd"></div>
      </div>
      <div class="delivery-info">
        <p class="active">京东快递</p>
      </div>
    </div>
    <div class="hr"></div>
    <div class="end">
      <button @click="submit">提交订单</button>
      <p class="price">
        应付总额: <b>{{ totalPrice + '.00' }}</b>
      </p>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" :title="currTitle" width="37%">
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
          :props="props"
        />
      </el-form-item>
      <el-form-item label="详细地址:" prop="detailsAddress">
        <el-input v-model="form.detailsAddress"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item>
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
import usePinia from '@/store'
import { useCountCartPrice } from '@/hooks/useCountCartPrice'
import LocalCache from '@/utils/cache'
import { ref, reactive, computed } from 'vue'
import cityData from '@/utils/citydata'
import { ElForm } from 'element-plus'
import 'element-plus/theme-chalk/el-form.css'
// import router from '@/router'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
// 级联选择器配置 点击触发
const props = {
  expandTrigger: 'click',
}
const dialogVisible = ref(false)
const { cart } = usePinia()
// const localAddress = LocalCache.getCache('pet-address')

const { userAddress, goodsList } = storeToRefs(cart)
// 用户地址
const newUserAddress = computed(() => {
  let data: any = null
  data = userAddress.value.filter((i) => {
    return i.isDefault == true
  })
  // if (!data.length) {
  //   data.push(localAddress)
  // }
  const ln = userAddress.value.length
  if (!data[0]) {
    dialogVisible.value = true
    return
  } else {
    if (data[0]?.address[2]) {
      data[0].newAddress =
        data[0].address[0] + data[0].address[1] + data[0].address[2]
    } else {
      data[0].newAddress = data[0].address[0] + data[0].address[1]
    }
    return data[0]
  }
})

// 商品总价
const { totalPrice } = useCountCartPrice()

const formRef = ref<InstanceType<typeof ElForm>>()
//验证手机号的规则;
var checkMobile = (rule: any, value: any, cb: any) => {
  // 验证手机号的正则表达式
  const regMobile =
    /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  if (regMobile.test(value)) {
    return cb()
  }
  cb(new Error('请输入合法的手机号'))
}
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

// 地址表单
let form = reactive({
  name: '',
  // address: <any[]>[],
  address: [],
  detailsAddress: '',
  mobile: '',
  isDefault: true,
})

// 重置reactive数据 对象
const clear = () => {
  const keys = Object.keys(form)
  let obj: { [name: string]: string } = {}
  keys.forEach((item) => {
    obj[item] = ''
  })
  Object.assign(form, obj)
}

// 当前弹窗标题
const currTitle = ref('')
const handleAdd = () => {
  clear()
  dialogVisible.value = true
  currTitle.value = '添加收获地址'
}

// 保存地址
const saveAddress = () => {
  formRef.value?.validate((valid) => {
    // if (valid) {
    //   if (currTitle.value == '添加收获地址') {
    //     cart.saveUserAddress(form)
    //   } else {
    //     cart.userAddress[0] = form
    //   }
    //   dialogVisible.value = false
    // }
  })
}
// 编辑地址
const handleEdit = () => {
  dialogVisible.value = true
  currTitle.value = '编辑收获地址'
  form.name = newUserAddress.value.name
  form.mobile = newUserAddress.value.mobile
  form.detailsAddress = newUserAddress.value.detailsAddress
  form.isDefault = newUserAddress.value.isDefault
  form.address = newUserAddress.value.address
}

const submit = () => {
  router.push({
    name: 'pay',
  })
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.line {
  border-top: 3px solid @basic-color;
}
.order {
  width: 1200px;
  margin: 20px auto;
  .title {
    display: flex;
    align-items: center;
    margin: 25px 0;
    .add {
      border: 1px solid @basic-color;
      background-color: transparent;
      font-size: 13px;
      padding: 5px;
      cursor: pointer;
      span {
        color: red;
        font-weight: bold;
        margin-right: 3px;
      }
      &:hover {
        color: coral;
      }
    }
    span {
      color: #999;
      &:first-child {
        color: #000;
      }
    }
    .bd {
      flex: 1;
      height: 2px;
      background-color: #eee;
      margin: 0 5px;
    }
  }
  .username-info {
    display: flex;
    align-items: center;
    .currInfo {
      border: 2px solid @basic-color;
      font-size: 13px;
      padding: 5px 15px;
      span:first-child {
        margin-right: 10px;
      }
    }
    ul {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 20px;
      height: 29px;
      li {
        margin-right: 20px;
        font-size: 12px;
      }
      .default {
        background-color: @basic-color;
        color: #fff;
        padding: 3px 6px;
      }
      li:last-child {
        flex: 1;
        text-align: right;
        cursor: pointer;
        &:hover {
          color: cornflowerblue;
        }
      }
      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
  .pay-mode {
    .pay-info {
      border: 2px solid @basic-color;
      display: inline-block;
      padding: 6px 15px;
      font-size: 13px;
    }
  }
  .delivery-mode {
    .delivery-info {
      display: flex;
      align-items: center;
      p {
        padding: 6px 15px;
        font-size: 13px;
        border: 1px solid #999;
        margin-right: 30px;
      }
      .active {
        border: 2px solid @basic-color;
      }
    }
  }
  .hr {
    height: 1px;
    background-color: #ccc;
    margin: 25px 0;
  }
  .end {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      width: 200px;
      height: 46px;
      background-color: @basic-color;
      border: 0;
      color: #fff;
      border-radius: 6px;
      font-weight: bold;
      letter-spacing: 2px;
      &:hover {
        background-color: #91d47e;
      }
    }
    .price {
      line-height: 30px;
      margin-top: 10px;
      b {
        color: red;
        font-size: 25px;
      }
    }
  }
}
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
