export default [
  // 获取首页轮播图
  {
    url: "/api/getSwiper",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          { url: 'src/assets/home/swiper1.jpg' },
          { url: 'src/assets/home/swiper2.jpg' },
          { url: 'src/assets/home/swiper3.jpg' },
          { url: 'src/assets/home/swiper4.jpg' },
        ],
        message: "获取成功",
      };
    },
  },
  // 分类主粮接口
  {
    url: "/api/getCategory/foodStuff",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          {
            type: '进口主粮', imgUrl: 'src/assets/home/jkzl.png', cate_id: 1000, title: '宠物主粮',
            children: [
              { type: '小型犬', id: 1001 },
              { type: '大型犬', id: 1002 },
            ]
          },
          {
            type: '国产主粮', imgUrl: 'src/assets/home/gczl.png', cate_id: 1000, title: '宠物主粮',
            children: [
              { type: '贵兵犬', id: 1003 },
              { type: '金毛犬', id: 1004 },
            ]
          },
        ],
        message: "获取成功",
      };
    },
  },
  // 分类零食接口
  {
    url: "/api/getCategory/snacks",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          {
            type: '肉制零食', imgUrl: 'src/assets/home/rzls.png', cate_id: 1300, title: '宠物零食',
            children: [
              { type: '烘干零食', id: 1005 },
              { type: '肉肠', id: 1006 },
            ]
          },
          {
            type: '罐头湿粮', imgUrl: 'src/assets/home/gt.png', cate_id: 1300, title: '宠物零食',
            children: [
              { type: '罐头', id: 1007 },
              { type: '餐盒', id: 1008 },
            ]
          },
        ],
        message: "获取成功",
      };
    },
  },
  // 分类玩具接口
  {
    url: "/api/getCategory/toys",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          {
            type: '磨牙玩具', imgUrl: 'src/assets/home/mywj.png', cate_id: 1500, title: '宠物玩具',
            children: [
              { type: '棉质', id: 1009 },
              { type: '橡胶', id: 1010 },
            ]
          },
          {
            type: '巡回玩具', imgUrl: 'src/assets/home/xhwj.png', cate_id: 1500, title: '宠物玩具',
            children: [
              { type: '球类玩具', id: 1011 },
            ]
          },
        ],
        message: "获取成功",
      };
    },
  },
  // 分类清洁接口
  {
    url: "/api/getCategory/clean",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          {
            type: '宠物厕所', imgUrl: 'src/assets/home/cwcs.png', cate_id: 1700, title: '宠物清洁',
            children: [
              { type: '立住厕所', id: 1012 },
              { type: '围栏厕所', id: 1013 },
            ]
          }
        ],
        message: "获取成功",
      };
    },
  },
  // 分类洗澡接口
  {
    url: "/api/getCategory/wash",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          {
            type: '日常洗护', imgUrl: 'src/assets/home/rcxh.png', cate_id: 1800, title: '宠物洗护',
            children: [
              { type: '超强去污', id: 1013 },
              { type: '除臭添香', id: 1014 },
            ]
          },
          {
            type: '梳剪工具', imgUrl: 'src/assets/home/sjgj.png', cate_id: 1800, title: '宠物洗护',
            children: [
              { type: '排梳', id: 1015 },
            ]
          },
        ],
        message: "获取成功",
      };
    },
  },
  // 分类服饰接口
  {
    url: "/api/getCategory/clothes",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          {
            type: '潮流服饰', imgUrl: 'src/assets/home/clfs.png', cate_id: 1600, title: '宠物服饰',
            children: [
              { type: '棉衣', id: 1016 },
              { type: '项链', id: 1017 },
              { type: '太阳帽', id: 1018 },
            ]
          }
        ],
        message: "获取成功",
      };
    },
  },


  // 推荐商品
  // 宠物主粮信息接口
  {
    url: "/api/goods/foodStuff",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          { name: 'poster', imgUrl: 'src/assets/goods/cwzl0.jpg', goods_id: 1110 },
          {
            title: '进口主粮',
            data: [
              {
                name: '加拿大原装进口 原始猎食渴望 六种鱼肉+美毛专用配方 全犬粮 2kg',
                oldPrice: '483',
                newPrice: '390.00',
                sales: 155,
                imgUrl: 'src/assets/goods/jkzl1.png', goods_id: 1100
              },
              {
                name: '加拿大原装进口 爱肯拿Acana 无谷深海鱼配方全犬粮 11.4kg',
                oldPrice: '1200',
                newPrice: '1020.00',
                sales: 65, imgUrl: 'src/assets/goods/jkzl2.png', goods_id: 1101
              },
              {
                name: '加拿大原装进口纽顿nutram number 无谷低升糖系列 T28鲑鱼&鳟鱼配方小型&玩赏犬粮 1.82kg',
                oldPrice: '358.70',
                newPrice: '276.00',
                sales: 65,
                imgUrl: 'src/assets/goods/jkzl3.png', goods_id: 1102
              },
              {
                name: '加拿大原装进口 原始猎食渴望 六种鱼肉+美毛专用配方 全犬粮 11.4kg ',
                oldPrice: '1080.70',
                newPrice: '970.00',
                sales: 95,
                imgUrl: 'src/assets/goods/jkzl4.png', goods_id: 1103
              },
              {
                name: '加拿大原装进口 原始猎食渴望 六种鱼肉+美毛专用配方 全犬粮 6kg',
                oldPrice: '756.70',
                newPrice: '610.00',
                sales: 195,
                imgUrl: 'src/assets/goods/jkzl5.png', goods_id: 1104
              },
              {
                name: '加拿大原装进口 爱肯拿Acana 无谷深海鱼配方全犬粮 6kg',
                oldPrice: '678.70',
                newPrice: '550.00',
                sales: 195,
                imgUrl: 'src/assets/goods/jkzl6.png', goods_id: 1105
              },
              {
                name: '新西兰原装进口耐吉斯SOLUTION 无谷羊肉配方全犬粮 1.5kg',
                oldPrice: '317.70',
                newPrice: '180.00',
                sales: 395,
                imgUrl: 'src/assets/goods/jkzl7.png', goods_id: 1106
              },
              {
                name: '加拿大原装进口纽顿nutram number 均衡低敏系列 S2鸡肉&全蛋配方幼犬粮 11.4kg',
                oldPrice: '890.70',
                newPrice: '848.00',
                sales: 135,
                imgUrl: 'src/assets/goods/jkzl8.png', goods_id: 1107
              },
            ]
          },
          {
            title: '国产主粮',
            data: [
              {
                name: '海尔仕 香酥牛肉味全犬种成犬粮 10kg',
                oldPrice: '198.70',
                newPrice: '109.00',
                sales: 875,
                imgUrl: 'src/assets/goods/gczl1.png', goods_id: 1200
              },
              {
                name: '醇粹Purich 金标无麸系列 大型犬幼犬全价粮 15kg',
                oldPrice: '565.70',
                newPrice: '409.00',
                sales: 175,
                imgUrl: 'src/assets/goods/gczl2.png', goods_id: 1201
              },
              {
                name: '皇家royal canin PR27小型犬成犬专用狗粮2kg ',
                oldPrice: '310.70',
                newPrice: '178.00',
                sales: 195,
                imgUrl: 'src/assets/goods/jkzl3.png', goods_id: 1202
              },
              {
                name: '皇家royal canin MIS30小型犬奶糕/怀孕母犬/哺乳母犬1kg',
                oldPrice: '145.70',
                newPrice: '83.00',
                sales: 985,
                imgUrl: 'src/assets/goods/gczl3.jpg', goods_id: 1203
              },
              {
                name: '伯纳天纯Pure&Natural 添加羊肉燕麦蔓越莓中/大型成犬粮 15kg',
                oldPrice: '698.70',
                newPrice: '569.00',
                sales: 95,
                imgUrl: 'src/assets/goods/jkzl5.png', goods_id: 1204
              },
              {
                name: '海洋之星 三文鱼配方 成犬粮 小颗粒 6kg',
                oldPrice: '510.70',
                newPrice: '409.00',
                sales: 215,
                imgUrl: 'src/assets/goods/gczl4.jpg', goods_id: 12005
              },
              {
                name: '比瑞吉 健康型天然粮 小型犬全价成犬粮 1.5kg',
                oldPrice: '176.70',
                newPrice: '99.00',
                sales: 1012,
                imgUrl: 'src/assets/goods/jkzl7.png', goods_id: 1206
              },
              {
                name: '醇粹Purich 经典系列 全价大型幼犬粮 15kg',
                oldPrice: '518.70',
                newPrice: '435.00',
                sales: 135,
                imgUrl: 'src/assets/goods/gczl5.jpg', goods_id: 1207
              },
            ]
          }
        ],
        message: "获取成功",
      };
    },
  },
  // 宠物零食信息接口
  {
    url: "/api/goods/snacks",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          { name: 'poster', imgUrl: 'src/assets/goods/rzls0.jpg', goods_id: 1300 },
          {
            title: '肉质零食',
            data: [
              {
                name: '路斯 手工坊系列 高钙牛肉段 200g ',
                oldPrice: '29.70',
                newPrice: '13.00',
                sales: 1135,
                imgUrl: 'src/assets/goods/rzls3.jpg', goods_id: 1301
              },
              {
                name: '顽皮Wanpy 醇香牛肉棒 400g ',
                oldPrice: '31.70',
                newPrice: '19.00',
                sales: 1635,
                imgUrl: 'src/assets/goods/rzls1.jpg', goods_id: 1302
              },
              {
                name: '顽皮Wanpy 犬用香脆牛肝片180g',
                oldPrice: '29.70',
                newPrice: '20.00',
                sales: 1335,
                imgUrl: 'src/assets/goods/rzls2.jpg', goods_id: 1303
              },
              {
                name: '蒙贝 牛肉胡萝卜粒 180g',
                oldPrice: '41.70',
                newPrice: '28.00',
                sales: 1935,
                imgUrl: 'src/assets/goods/rzls3.jpg', goods_id: 1304
              },
              {
                name: '蒙贝 牛肉菠菜粒 180g',
                oldPrice: '36.70',
                newPrice: '28.00',
                sales: 1235,
                imgUrl: 'src/assets/goods/rzls4.jpg', goods_id: 1305
              },
              {
                name: '蒙贝 牛肉地瓜粒狗零食 180g',
                oldPrice: '37.70',
                newPrice: '21.00',
                sales: 1535,
                imgUrl: 'src/assets/goods/rzls5.jpg', goods_id: 1306
              },
              {
                name: '蒙贝 精纯牛肉丁 180g',
                oldPrice: '31.70',
                newPrice: '24.00',
                sales: 1615,
                imgUrl: 'src/assets/goods/rzls6.jpg', goods_id: 1307
              },
              {
                name: '路斯 健康优+组合 翅膀鸡胸肉 100g ',
                oldPrice: '22.70',
                newPrice: '13.00',
                sales: 1915,
                imgUrl: 'src/assets/goods/rzls2.jpg', goods_id: 1308
              },
            ]
          },
          {
            title: '罐头湿粮',
            data: [
              {
                name: '宝路 成犬 滑嫩鸡肉妙鲜包 100g*12袋装',
                oldPrice: '68.70',
                newPrice: '47.00',
                sales: 2135,
                imgUrl: 'src/assets/goods/gtls1.jpg', goods_id: 1400
              },
              {
                name: '日本爱丽思IRIS 牛肉味犬罐头 ONE CARE系列 100g*3个装 整盒装 牛肉',
                oldPrice: '25.70',
                newPrice: '19.00',
                sales: 635,
                imgUrl: 'src/assets/goods/gtls2.jpg', goods_id: 1401
              },
              {
                name: '日本爱丽思IRIS 鸡肉蔬菜味犬罐头 ONE CARE系列 100g*3个装 整盒装 鸡肉+蔬菜',
                oldPrice: '24.70',
                newPrice: '17.00',
                sales: 535,
                imgUrl: 'src/assets/goods/gtls3.jpg', goods_id: 1402
              },
              {
                name: '爱丽思IRIS 鸡肉蔬菜味 犬罐头 100g 单罐装 鸡肉+蔬菜',
                oldPrice: '18.70',
                newPrice: '11.00',
                sales: 1235,
                imgUrl: 'src/assets/goods/gtls4.jpg', goods_id: 1403
              },
              {
                name: '爱丽思IRIS 牛肉+米饭配方犬罐头 Natural系列 100g',
                oldPrice: '13.70',
                newPrice: '7.00',
                sales: 1235,
                imgUrl: 'src/assets/goods/gtls5.jpg', goods_id: 1404
              },
              {
                name: '泰国进口渔极 金枪鱼+三文鱼狗罐头 80g ',
                oldPrice: '19.70',
                newPrice: '10.00',
                sales: 935,
                imgUrl: 'src/assets/goods/gtls6.jpg', goods_id: 1405
              },
              {
                name: '日本爱丽思IRIS 亮毛防脱膳食犬罐头 100g',
                oldPrice: '37.70',
                newPrice: '22.00',
                sales: 835,
                imgUrl: 'src/assets/goods/gtls7.jpg', goods_id: 1406
              },
              {
                name: '新西兰原装进口 滋益巅峰Ziwi Peak 羊肉配方狗罐头 390g',
                oldPrice: '83.70',
                newPrice: '51.00',
                sales: 335,
                imgUrl: 'src/assets/goods/gtls2.jpg', goods_id: 1407
              },
            ]
          }
        ],
        message: "获取成功",
      };
    },
  },
  // 宠物玩具信息接口
  {
    url: "/api/goods/toys",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          { name: 'poster', imgUrl: 'src/assets/goods/cwwj0.jpg', goods_id: 1500 },
          {
            title: '百货玩具',
            data: [
              {
                name: '亲宠宠物磨牙螺纹骨头大中小型犬用狗玩具耐咬洁齿发声解闷解压',
                oldPrice: '33.70',
                newPrice: '21.00',
                sales: 735,
                imgUrl: 'src/assets/goods/cwwj1.jpg', goods_id: 1501
              },
              {
                name: '佩迪熊Petenjoy网红飞盘足球狗狗玩具宠物回弹拉力球耐咬中型犬',
                oldPrice: '76.70',
                newPrice: '57.00',
                sales: 635,
                imgUrl: 'src/assets/goods/cwwj2.jpg', goods_id: 1502
              },
              {
                name: '萌嘟星宠 狗狗玩具耐咬磨牙棒狗咬胶小型犬幼犬球柯基橡胶解闷',
                oldPrice: '52.70',
                newPrice: '27.00',
                sales: 1135,
                imgUrl: 'src/assets/goods/cwwj3.jpg', goods_id: 1503
              },
              {
                name: '胖丁玩伴（Pumpkii）宠物监控可移动机器人智能遥控猫狗玩具宠物陪伴摄像头',
                oldPrice: '390.70',
                newPrice: '289.00',
                sales: 715,
                imgUrl: 'src/assets/goods/cwwj4.jpg', goods_id: 1504
              },
              {
                name: '亲宠宠物（thinkerpet）发声乳胶穿绳鹿 大中小犬通用 ',
                oldPrice: '38.70',
                newPrice: '26.00',
                sales: 1135,
                imgUrl: 'src/assets/goods/cwwj5.jpg', goods_id: 1505
              },
              {
                name: '宜特（EETOYS）小号狗爪骨狗狗玩具零食磨牙耐咬洁齿棒泰迪比熊小型',
                oldPrice: '38.70',
                newPrice: '21.00',
                sales: 1131,
                imgUrl: 'src/assets/goods/cwwj6.jpg', goods_id: 1506
              },
              {
                name: '宠物磨牙螺纹骨头大中小型犬用狗玩具耐咬洁齿发声解闷解压',
                oldPrice: '37.70',
                newPrice: '28.00',
                sales: 1310,
                imgUrl: 'src/assets/goods/cwwj1.jpg', goods_id: 1507
              },
              {
                name: '网红飞盘足球狗狗玩具宠物回弹拉力球耐咬 ',
                oldPrice: '46.70',
                newPrice: '33.00',
                sales: 1120,
                imgUrl: 'src/assets/goods/cwwj2.jpg', goods_id: 1508
              },
            ]
          }
        ],
        message: "获取成功",
      };
    },
  },
  // 宠物服饰信息接口
  {
    url: "/api/goods/clothes",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          { name: 'poster', imgUrl: 'src/assets/goods/cwfs0.jpg', goods_id: 1600 },
          {
            title: '百货玩具',
            data: [
              {
                name: '衣服 狗狗衣服秋冬新款泰迪贵宾博美小狗',
                oldPrice: '19.70',
                newPrice: '14.00',
                sales: 1182,
                imgUrl: 'src/assets/goods/cwfs1.jpg', goods_id: 1601
              },
              {
                name: '衣服 毛绒贴标灯芯绒狗狗秋冬新款泰迪贵宾狗',
                oldPrice: '31.70',
                newPrice: '29.00',
                sales: 935,
                imgUrl: 'src/assets/goods/cwfs2.jpg', goods_id: 1602
              },
              {
                name: '原神cos钟离 衣服猫咪摩拉克斯',
                oldPrice: '50.70',
                newPrice: '34.00',
                sales: 796,
                imgUrl: 'src/assets/goods/cwfs3.jpg', goods_id: 1603
              },
              {
                name: '间谍过家家cos阿尼亚福杰 衣服猫咪小豆丁动漫',
                oldPrice: '31.70',
                newPrice: '19.00',
                sales: 631,
                price: '19.00', imgUrl: 'src/assets/goods/cwfs4.jpg', goods_id: 1604
              },
              {
                name: '大狗狗衣服秋冬装金毛萨摩耶拉布拉多边牧柴犬柯基中型大型犬  ',
                oldPrice: '35.70',
                newPrice: '23.00',
                sales: 1151,
                imgUrl: 'src/assets/goods/cwfs5.jpg', goods_id: 1605
              },
              {
                name: '丑丑狗衣服秋冬泰迪比熊约克夏雪纳瑞 双面穿熊宝羽绒马甲背心',
                oldPrice: '66.70',
                newPrice: '41.00',
                sales: 987,
                imgUrl: 'src/assets/goods/cwfs6.jpg', goods_id: 1606
              },
              {
                name: '狗狗夏天吊带衣服珍珠裙子礼服马尔济斯约克夏比熊小型犬',
                oldPrice: '41.70',
                newPrice: '25.00',
                sales: 1535,
                imgUrl: 'src/assets/goods/cwfs1.jpg', goods_id: 1607
              },
              {
                name: '狗狗衣服秋冬新款泰迪贵宾博美小狗 ',
                oldPrice: '56.70',
                newPrice: '36.00',
                sales: 890,
                imgUrl: 'src/assets/goods/cwfs2.jpg', goods_id: 1608
              },
            ]
          }
        ],
        message: "获取成功",
      };
    },
  },
];