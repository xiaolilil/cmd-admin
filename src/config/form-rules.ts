export const rules = {
  petName: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '长度必须是5-10位以上字母或者数字',
      trigger: 'blur',
    },
  ],
  petPwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '长度必须是3位以上字母或者数字',
      trigger: 'blur',
    },
  ],
  confirmPwd: [
    { required: true, message: '请再次输入上面的密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '长度必须是3位以上字母或者数字',
      trigger: 'blur',
    },
  ],
}
