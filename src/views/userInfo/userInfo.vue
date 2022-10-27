<template>
  <div class="user-info">
    <form action="">
      <input id="btn" type="file" placeholder="上传" />
    </form>
  </div>
</template>

<script lang="ts" setup>
// document.getElementById('btn').addEventListener('change', (e) => {
//   var formdata = new FormData() //创建出formdata对象（异步上传文件）
//   formdata.append('image', e.target.files[0])
//   axios({
//     method: 'post',
//     url: '/order/test',
//     data: formdata,
//     headers: { 'Content-Type': 'multipart/form-data' },
//   })
// })
</script>
<!-- 

// 上传头像
const selectImg = (e: any) => {
  // 获取文件
  const file = e.target.files[0]
  console.log('file', file)

  //创建出formdata对象（异步上传文件）
  var formData = new FormData()
  // FormData格式
  formData.append('file', file)
}
// 指定分片大小为10MB
const file_size = 1024 * 1024 * 10
//sliceFile为自定义分片并上传的函数
const changeFile = (e: any) => {
  // 获取文件
  const file = e.target.files[0]
  console.log('file::::', file)
  sliceFile(file, index)
}

const sliceFile = (file: any, index: any) => {
  // 分多少片
  const file_len = Math.ceil(file.size / file_size)
  console.log('file_len::::', file_len)
  // 文件名和后缀名
  const [fname, fext] = file.name.split('.')
  console.log('file and fname:::', fname, fext)
  // 切片开始
  const slice_start = index * file_size
  if (file.size <= slice_start) {
    console.log('切片完成')
    return
  }
  // 切片结束
  const slice_end = slice_start + file_size
  // blobname
  const blobname = `${fname}_${index}.${fext}`
  // 切片文件
  const blob = file.slice(slice_start, slice_end)
  // blob to file
  const blobfile = new File([blob], blobname)
  console.log('blob:::', blob)

  const form = new FormData() //定义集合方便后端接收
  form.append('file', blobfile) //将文件追加到集合中
  form.append('name', blobname) //将文件名追加到集合中
  form.append('size', blob.size) //将文件大小追加到集合中
  form.append('index', index.toString()) //将文件索引追加到集合中
}

 -->
<style lang="less" scoped></style>
