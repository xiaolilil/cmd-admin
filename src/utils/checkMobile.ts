export function checkMobile(rule: any, value: any, cb: any) {
  // 验证手机号的正则表达式
  const regMobile =
    /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  if (regMobile.test(value)) {
    return cb()
  }
  cb(new Error('请输入合法的手机号'))
}
