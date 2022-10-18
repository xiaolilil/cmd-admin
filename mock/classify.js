import foodStuff from './data/foodStuff.json'
import snacks from './data/snacks.json'
const Mock = require('mockjs');

// 肉食
const meatSnacksImgsList = [
  'src/assets/goods/rzls0.jpg',
  'src/assets/goods/rzls1.jpg',
  'src/assets/goods/rzls2.jpg',
  'src/assets/goods/rzls3.jpg',
  'src/assets/goods/rzls4.jpg',
  'src/assets/goods/rzls5.jpg',
  'src/assets/goods/rzls6.jpg',
  'src/assets/goods/rzls7.jpg',
  'src/assets/goods/rzls8.jpg',
  'src/assets/goods/rzls9.jpg',
  'src/assets/goods/rzls10.jpg',
  'src/assets/goods/rzls11.jpg',
  'src/assets/goods/rzls12.jpg',
  'src/assets/goods/rzls13.jpg',
  'src/assets/goods/rzls14.jpg',
  'src/assets/goods/rzls15.jpg',
]
// 零食
const canSnacksImgsList = [
  'src/assets/goods/gtls1.jpg',
  'src/assets/goods/gtls2.jpg',
  'src/assets/goods/gtls3.jpg',
  'src/assets/goods/gtls4.jpg',
  'src/assets/goods/gtls5.jpg',
  'src/assets/goods/gtls6.jpg',
  'src/assets/goods/gtls7.jpg',
  'src/assets/goods/gtls8.jpg',
  'src/assets/goods/gtls9.jpg',
  'src/assets/goods/gtls10.jpg',
  'src/assets/goods/gtls11.jpg',
  'src/assets/goods/gtls12.jpg',
  'src/assets/goods/gtls13.jpg',
  'src/assets/goods/gtls14.jpg',
  'src/assets/goods/gtls15.jpg',
  'src/assets/goods/gtls16.jpg',
]
// 玩具
const toysImgsList = [
  'src/assets/goods/cwwj0.jpg',
  'src/assets/goods/cwwj1.jpg',
  'src/assets/goods/cwwj2.jpg',
  'src/assets/goods/cwwj3.jpg',
  'src/assets/goods/cwwj4.jpg',
  'src/assets/goods/cwwj5.jpg',
  'src/assets/goods/cwwj6.jpg',
  'src/assets/goods/cwwj7.jpg',
  'src/assets/goods/cwwj8.jpg',
  'src/assets/goods/cwwj9.jpg',
  'src/assets/goods/cwwj10.jpg',
  'src/assets/goods/cwwj11.jpg',
  'src/assets/goods/cwwj12.jpg',
  'src/assets/goods/cwwj13.jpg',
  'src/assets/goods/cwwj14.jpg',
  'src/assets/goods/cwwj15.jpg',
]
// 清洁
const cleanImgsList = [
  'src/assets/goods/cwqj1.jpg',
  'src/assets/goods/cwqj2.jpg',
  'src/assets/goods/cwqj3.jpg',
  'src/assets/goods/cwqj4.jpg',
  'src/assets/goods/cwqj5.jpg',
  'src/assets/goods/cwqj6.jpg',
  'src/assets/goods/cwqj7.jpg',
  'src/assets/goods/cwqj8.jpg',
  'src/assets/goods/cwqj9.jpg',
  'src/assets/goods/cwqj10.jpg',
  'src/assets/goods/cwqj11.jpg',
  'src/assets/goods/cwqj12.jpg',
  'src/assets/goods/cwqj13.jpg',
  'src/assets/goods/cwqj14.jpg',
  'src/assets/goods/cwqj15.jpg',
  'src/assets/goods/cwqj16.jpg',
]
// 服饰
const clothesImgsList = [
  'src/assets/goods/cwfs1.jpg',
  'src/assets/goods/cwfs2.jpg',
  'src/assets/goods/cwfs3.jpg',
  'src/assets/goods/cwfs4.jpg',
  'src/assets/goods/cwfs5.jpg',
  'src/assets/goods/cwfs6.jpg',
  'src/assets/goods/cwfs7.jpg',
  'src/assets/goods/cwfs8.jpg',
  'src/assets/goods/cwfs9.jpg',
  'src/assets/goods/cwfs10.jpg',
  'src/assets/goods/cwfs11.jpg',
  'src/assets/goods/cwfs12.jpg',
  'src/assets/goods/cwfs13.jpg',
  'src/assets/goods/cwfs14.jpg',
  'src/assets/goods/cwfs15.jpg',
  'src/assets/goods/cwfs16.jpg',
]
// 洗澡
const washImgsList = [
  'src/assets/goods/cwxh1.jpg',
  'src/assets/goods/cwxh2.jpg',
  'src/assets/goods/cwxh3.jpg',
  'src/assets/goods/cwxh4.jpg',
  'src/assets/goods/cwxh5.jpg',
  'src/assets/goods/cwxh6.jpg',
  'src/assets/goods/cwxh7.jpg',
  'src/assets/goods/cwxh8.jpg',
  'src/assets/goods/cwxh9.jpg',
  'src/assets/goods/cwxh10.jpg',
  'src/assets/goods/cwxh11.jpg',
  'src/assets/goods/cwxh12.jpg',
  'src/assets/goods/cwxh13.jpg',
  'src/assets/goods/cwxh14.jpg',
  'src/assets/goods/cwxh15.jpg',
  'src/assets/goods/cwxh16.jpg',
]
// 梳理
const combImgsList = [
  'src/assets/goods/sj1.jpg',
  'src/assets/goods/sj2.jpg',
  'src/assets/goods/sj3.jpg',
  'src/assets/goods/sj4.jpg',
  'src/assets/goods/sj5.jpg',
  'src/assets/goods/sj6.jpg',
  'src/assets/goods/sj7.jpg',
  'src/assets/goods/sj8.jpg',
  'src/assets/goods/sj9.jpg',
  'src/assets/goods/sj10.jpg',
  'src/assets/goods/sj11.jpg',
  'src/assets/goods/sj12.jpg',
  'src/assets/goods/sj13.jpg',
  'src/assets/goods/sj14.jpg',
  'src/assets/goods/sj15.jpg',
  'src/assets/goods/sj16.jpg',
]
export default [
  // 获取分类商品
  {
    url: "/api/goods/classify",
    method: "post",
    response: (req) => {
      let { cate_id } = req.body
      const allCateId = ['1000', '1300', '1400', '1500', '1600', '1700', '1800']
      const isHaveCateIdRes = allCateId.indexOf(i => i == cate_id)
      let data = null
      if (isHaveCateIdRes) {
        switch (cate_id) {
          // 宠物主粮
          case '1000':
            data = { importGoods: foodStuff.importGoods, domesticGoods: foodStuff.domesticGoods }
            break;
          // 宠物零食
          case '1300':
            data = Mock.mock({
              "meatSnacks|16": [{
                'name': "@name",
                "imgUrl|1": meatSnacksImgsList,
                'oldPrice|80-99': 83,
                'newPrice|30-60': 55,
                'sales|50-500': 55,
                'age|1': ['全年龄', '成龄', '幼龄'],
                'goods_id|+1': 1300
              }],
              "canSnacks|16": [{
                'name': "@name",
                "imgUrl|1": canSnacksImgsList,
                'oldPrice|80-99': 83,
                'newPrice|30-60': 55,
                'sales|50-500': 55,
                'age|1': ['全年龄', '成龄', '幼龄'],
                'goods_id|+1': 1400
              }]
            })
            break;
          // 宠物玩具
          case '1500':
            data = Mock.mock({
              "tooth|16": [{
                'name': "@name",
                "imgUrl|1": toysImgsList,
                'oldPrice|50-99': 56,
                'newPrice|15-50': 25,
                'sales|150-5000': 550,
                'age|1': ['全年龄', '成龄', '幼龄'],
                'goods_id|+1': 1500
              }],
              "tour|16": [{
                'name': "@name",
                "imgUrl|1": toysImgsList,
                'oldPrice|50-99': 56,
                'newPrice|15-50': 25,
                'sales|150-5000': 550,
                'age|1': ['全年龄', '成龄', '幼龄'],
                'goods_id|+1': 1520
              }]
            })
            break;
          // 宠物服饰
          case '1600':
            data = Mock.mock({
              "clothes|16": [{
                'name': "@name",
                "imgUrl|1": clothesImgsList,
                'oldPrice|35-189': 60,
                'newPrice|20-150': 30,
                'sales|50-1000': 80,
                'age|1': ['全年龄', '成龄', '幼龄'],
                'goods_id|+1': 1600
              }]
            })
            break;
          // 宠物清洁
          case '1700':
            data = Mock.mock({
              "clean|16": [{
                'name': "@name",
                "imgUrl|1": cleanImgsList,
                'oldPrice|35-159': 60,
                'newPrice|30-110': 30,
                'sales|150-8000': 550,
                'age|1': ['全年龄', '成龄', '幼龄'],
                'goods_id|+1': 1700
              }]
            })
            break;
          // 宠物洗护 梳剪
          case '1800':
            data = Mock.mock({
              "wash|16": [{
                'name': "@name",
                "imgUrl|1": washImgsList,
                'oldPrice|35-119': 60,
                'newPrice|20-80': 27,
                'sales|150-8000': 550,
                'age|1': ['全年龄', '成龄', '幼龄'],
                'goods_id|+1': 1800
              }],
              "comb|16": [{
                'name': "@name",
                "imgUrl|1": combImgsList,
                'oldPrice|25-69': 50,
                'newPrice|7-50': 12,
                'sales|150-8000': 550,
                'age|1': ['全年龄', '成龄', '幼龄'],
                'goods_id|+1': 1820
              }],
            })
            break;
          default:
            break;
        }
        return {
          code: 200,
          message: "获取分类商品成功",
          data: data
        };
      } else {
        return {
          code: 401,
          message: "商品分类ID有误",
          data: null,
        };
      }
    },
  },




];