import service from '@/utils/request'
import axios from 'axios'
import { IUpadateInfo } from '@/types/apis'

/**
 * @description: 上传图片
 * @param {any} data
 * @return {*}
 */
export function uploadImgApi(data: any) {
  return service({
    url: '/users/updateImg',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

// export function uploadImgApi(data: any) {
//   axios({
//     method: 'post',
//     url: 'http://127.0.0.1:5173/users/updateImg',
//     data,
//     headers: {
//       token:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjY3ODI4MDN9.FJHiuqDvyUzsI_GulYoeRuaDL8aPe2sWmh4wigYOSFc',
//       'Content-Type': 'multipart/form-data',
//     },
//   })
// }

/**
 * @description: 修改用户密码
 * @param {any} data {userId:'11', userPwd:'123}
 * @return {*}
 */
export function changePwdApi(data: { userId: string; userPwd: string }) {
  return service({
    url: '/users/pass',
    method: 'post',
    data,
  })
}

/**
 * @description: 修改用户信息
 * @param {any} data {userId, name, avatar, ip}
 * @return {*}
 */
export function updateUserInfoApi(data: IUpadateInfo) {
  return service({
    url: '/users/exit',
    method: 'post',
    data,
  })
}
