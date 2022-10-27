export function clearObj(obj: object) {
  // 判断是不是对象
  if (!Boolean(Object.prototype.toString.call(obj) == '[object Object]')) {
    return false
  }
  for (const key in obj) {
    if (Object.prototype.toString.call(obj[key]) == '[object Object]') {
      // 处理多级非空对象
      if (Object.keys(obj[key]).length > 0) {
        clearObj(obj[key])
      }
    } else if (Array.isArray(obj[key])) {
      // 数组置空
      obj[key] = []
    } else {
      // 其他类型, 如果以下对象没有包含类型的将会是 undefined
      let dataType = {
        number: 0,
        string: '',
        boolean: false,
        function: () => {},
      }
      let _key = typeof obj[key]
      obj[key] = dataType[_key]
    }
  }
  return obj
}
