export function getDate() {
  let dt = new Date()
  let y = dt.getFullYear()
  let mt = dt.getMonth() + 1
  let day = dt.getDate()
  let h = dt.getHours() //获取时
  let m = dt.getMinutes() //获取分
  let s = dt.getSeconds() //获取秒

  return `${y}-${mt}-${day} ${h}-${m}-${s}`
}
