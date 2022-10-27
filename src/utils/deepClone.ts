export function deepClone(obj: object) {
  let newObj = obj instanceof Array ? [] : {}
  for (let i in obj) {
    if (typeof obj[i] == 'object' && obj[i]) {
      newObj[i] = deepClone(obj[i])
    } else {
      newObj[i] = obj[i]
    }
  }
  return newObj
}
