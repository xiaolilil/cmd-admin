<template>
  <div class="my-info">
    <div class="title">个人信息</div>
    <ul class="info">
      <li>
        <span>头像: </span>
        <div class="img">
          <img
            src="https://img2.epetbar.com/dogs/1.jpg@!100w-c"
            accept="image/png, image/jpeg"
            alt=""
          />
          <input id="upload" type="file" @change="selectImg" />
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

  <Dialog
    :text="text"
    icon="icon-cuowu"
    :is-show="isShow"
    @update-dialog="updateDialog"
  />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import usePinia from '@/store'
import { uploadImgApi, updateUserInfoApi } from '@/api/userInfo'
import Dialog from '@/components/dialog/dialog.vue'
import { FILE_TEXT } from '@/text'
import { IUpadateInfo } from '@/types/apis'

const { user } = usePinia()
const size = ref<'' | 'large' | 'small'>('')

// 用户信息
const userInfo = reactive<IUpadateInfo>({
  userId: user.userId + '',
  name: user.username,
  ip: '四川省成都市',
  avatar: '',
  time: '2022-10-10',
})

const text = ref('')
const isShow = ref(false)
// 用户信息
const info = reactive({
  avatar: user.avatar, // 图像
  nickName: user.username, // 昵称
  time: '', // 首次养宠时间
  sex: '', // 性别
})

const updateDialog = () => {
  isShow.value = false
}

// 上传头像
const selectImg = (e: any) => {
  // 获取文件
  const file = e.target.files[0]
  console.log('file', file)

  const imgSize = file.size
  // 格式不正确
  let img_regexp = /^image\/\w/g
  if (!img_regexp.test(file.type)) {
    text.value = FILE_TEXT.TYPE_ERR
    isShow.value = true
    return
  }
  // 超出大小
  if (imgSize > 2 * 1024 * 1024) {
    text.value = FILE_TEXT.SIZE_ERR
    isShow.value = true
    return
  }

  //创建出formdata对象（异步上传文件）
  var formData = new FormData()
  // FormData格式
  formData.append('file', file)
  uploadImgApi(formData)
}

// 保存信息
const save = async () => {
  const { data: res } = await updateUserInfoApi(userInfo)
  console.log('res', res)
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
      #upload {
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
