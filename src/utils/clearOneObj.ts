// 重置reactive数据 对象
export const clear = (form: object) => {
  const keys = Object.keys(form)
  let obj: { [name: string]: string } = {}
  keys.forEach((item) => {
    obj[item] = ''
  })
  Object.assign(form, obj)
}
