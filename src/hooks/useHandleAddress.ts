import { ref, reactive, watch, computed, onMounted } from 'vue'
import usePinia from '@/store'
import LocalCache from '@/utils/cache'

export function useHandleAddress(pageName: string) {
  const { cart, user } = usePinia()
  // 收获地址
  const formatAddress = computed(() => {
    let address = ''
    if (cart.addressData.address) {
      if (cart.addressData.address.length === 3) {
        address =
          cart.addressData.address[0] +
          cart.addressData.address[1] +
          cart.addressData.address[2]
      } else {
        address = cart.addressData.address[0] + cart.addressData.address[1]
      }
    }
    return address + ' ' + cart.addressData.detailsAddress
  })
  // 格式化手机号码 中间4位显示星星
  const formatPhone = (tel: any) => {
    return tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }

  // 地址对象数据
  let formData: any = computed(() => {
    return cart.addressData
  })

  // 当前弹窗标题
  const currTilte = ref('')
  // 是否显示弹窗
  const isShowDialog = ref(false)

  // 新增地址
  const handleAdd = () => {
    currTilte.value = '新增收货地址'
    isShowDialog.value = true
  }

  // 编辑地址
  const handleEdit = () => {
    currTilte.value = '编辑收货地址'
    isShowDialog.value = true
  }

  // 删除地址
  const handleDel = () => {
    cart.delAddressData()
  }

  onMounted(() => {
    // 如果没有地址，就先弹窗让用户添加地址
    if (pageName === 'order') {
      if (formData.value.detailsAddress == '') {
        isShowDialog.value = true
      }
    }
  })

  const userId = user.userId
  return {
    handleAdd,
    handleDel,
    handleEdit,
    formatPhone,
    formData,
    formatAddress,
    currTilte,
    isShowDialog,
    userId,
  }
}
