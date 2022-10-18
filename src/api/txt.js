
// 获取首页轮播图
router.get('/getSwiper', function (req, res, next) {
  res.send(
    {
      code: 200,
      data: [
        { url: 'src/assets/home/swiper1.jpg' },
        { url: 'src/assets/home/swiper2.jpg' },
        { url: 'src/assets/home/swiper3.jpg' },
        { url: 'src/assets/home/swiper4.jpg' },
      ],
      message: "获取成功",
    });

});

// 分类主粮接口
router.get('/getCategory/foodStuff', function (req, res, next) {
  foodStuff("宠物主粮").then(response => {
    res.send(response)
  })
});


// 分类零食接口
router.get('/getCategory/snacks', function (req, res, next) {
  foodStuff("宠物零食").then(response => {
    res.send(response)
  })
});

// 分类玩具接口
router.get('/getCategory/toys', function (req, res, next) {
  foodStuff("宠物玩具").then(response => {
    res.send(response)
  })
});

// 分类清洁接口
router.get('/getCategory/clean', function (req, res, next) {
  foodStuff("宠物清洁").then(response => {
    res.send(response)
  })
});


// 分类洗澡接口
router.get('/getCategory/wash', function (req, res, next) {
  foodStuff("宠物洗护").then(response => {
    res.send(response)
  })
});

// 分类服饰接口
router.get('/getCategory/clothes', function (req, res, next) {
  foodStuff("宠物服饰").then(response => {
    res.send(response)
  })
});







// 宠物主粮信息接口
router.get('/goods/foodStuff', function (req, res, next) {
  Goods([1, 2]).then(response => {
    res.send(response)
  })
});

// 宠物零食信息接口
router.get('/goods/snacks', function (req, res, next) {
  Goods([3, 4]).then(response => {
    res.send(response)
  })
});

// 宠物玩具信息接口
router.get('/goods/toys', function (req, res, next) {
  Goods(5).then(response => {
    res.send(response)
  })
});


// 宠物服饰信息接口
router.get('/goods/clothes', function (req, res, next) {
  Goods([10]).then(response => {
    res.send(response)
  })
});


