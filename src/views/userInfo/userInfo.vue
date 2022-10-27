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

<style lang="less" scoped></style>
