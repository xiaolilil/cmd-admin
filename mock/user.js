import { getWindow } from '../src/utils/getWindow'
export default [
  {
    // 登录接口
    url: "/api/login",
    method: "post",
    response: (req) => {
      let { petName, petPwd } = req.body
      if (petName == "pet123" && petPwd == "mypet123") {
        return {
          code: 200,
          message: "登录成功",
          data: {
            userId: 101,
            username: 'pet12345',
            avatar: 'src/assets/user/avatar.webp',
            token: 'pet-token-12345a2sdd546jhj9oki99'
          },
        };
      } else {
        return {
          code: 401,
          message: "当前账号还未注册",
          data: null,
        };
      }
    },
  },
  //退出接口
  {
    url: "/api/loginOut",
    method: "get",
    response: (req) => {
      return {
        code: 200,
        message: "已退出登录",
      };
    },
  },

  // 注册接口
  {
    url: "/api/register",
    method: "post",
    response: (req) => {
      if (req.body) {
        return {
          code: 200,
          message: "注册成功",
        };
      } else {
        return {
          code: 400,
          message: "缺少必填参数",
        }
      }

    },
  },
];