// 姓名打星号
export function formatName(name: string) {
  var newStr
  if (name.length === 2) {
    newStr = name.substr(0, 1) + '*'
  } else if (name.length > 2) {
    var char = ''
    for (var i = 0, len = name.length - 2; i < len; i++) {
      char += '*'
    }
    newStr = name.substr(0, 1) + char + name.substr(-1, 1)
  } else {
    newStr = name
  }
  return newStr
}
