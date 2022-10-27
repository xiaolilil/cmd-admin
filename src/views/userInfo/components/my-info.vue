<template>
  <div class="my-info">
    <div class="title">个人信息</div>
    <ul class="info">
      <li>
        <span>头像: </span>
        <div class="img">
          <img src="https://img2.epetbar.com/dogs/1.jpg@!100w-c" alt="" />
          <form action="">
            <input
              id="upload"
              type="file"
              accept="image/png, image/jpeg"
              @change="selectImg"
            />
          </form>
        </div>
      </li>
      <li>
        <span>昵称: </span>
        <el-input v-model="info.nickName"></el-input>
      </li>
      <li>
        <span>性别: </span>
        <el-radio-group v-model="info.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </li>
      <li>
        <span>首次养宠时间: </span>
        <el-date-picker
          v-model="info.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="请选择日期"
          :size="size"
        />
      </li>
    </ul>
    <button class="save" @click="save">保存</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import usePinia from '@/store'

const { user } = usePinia()
const size = ref<'' | 'large' | 'small'>('')

// 用户信息
const info = reactive({
  avatar: user.avatar, // 图像
  nickName: user.username, // 昵称
  time: '', // 首次养宠时间
  sex: '', // 性别
})

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
// 上传
const uploadImg = (form: any) => {
  // upload(form).then((res: any) => {
  //   console.log('第多少片：', index)
  //   percentage.value = ((100 * index) / file_len).toFixed(2)
  //   index++
  //   if (index < file_len) {
  //     sliceFile(file, index)
  //   } else {
  //     percentage.value = 100
  //     console.log('结束了')
  //     return
  //   }
  //   if (res.code == 0) {
  //     ElMessage.success('上传成功')
  //   }
  // })
}

// 保存信息
const save = () => {
  console.log('info', info)
}
</script>

<style lang="less" scoped>
.title {
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid #eee;
  border-top: 2px solid #1fac75;
  font-size: 13px;
  font-weight: 600;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -10px;
    width: 600px;
    height: 1px;
    background-color: #eee;
  }
}
.info {
  padding-left: 50px;
  padding-top: 30px;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
      margin-right: 20px;
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    .img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      border: 1px solid #ddd;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100px;
        height: 100px;
      }
      &::after {
        content: '编辑';
        width: 100px;
        height: 30px;
        background-color: rgba(119, 106, 106, 0.74);
        position: absolute;
        bottom: 0;
        z-index: 1;
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
      }
      form {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 20;
        opacity: 0;
        cursor: pointer;
      }
    }

    .el-input {
      width: 200px;
    }
  }
}
.save {
  width: 130px;
  height: 45px;
  background-color: #33cb98;
  color: #fff;
  border: none;
  border-radius: 10px;
  margin-left: 100px;
  margin-top: 30px;
  cursor: pointer;
}
</style>
