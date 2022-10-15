import { createRouter, createWebHashHistory } from 'vue-router'
import type { App } from 'vue'
// 加 type 告诉别人这里引入的是一个类型，不是函数 接口等等
import type { RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: '注册' },
    component: () => import('@/views/register/register.vue'),
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: () => import('@/views/main/home/home.vue'),
    redirect: '/home/cate',
    children: [
      {
        path: 'cate',
        name: 'cate',
        meta: { title: '首页商品分类' },
        component: () => import('@/views/main/cate/cates.vue'),
      },
      {
        path: 'classifies',
        name: 'classifies',
        meta: { title: '商品分类' },
        component: () => import('@/views/main/classifies/classifies.vue'),
      },
      {
        path: 'goodsDetails',
        name: 'goodsDetails',
        meta: { title: '商品详情' },
        component: () => import('@/views/main/goodsDetails/goods-details.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        meta: { title: '购物车' },
        component: () => import('@/views/main/cart/cart.vue'),
      },
      {
        path: 'order',
        name: 'order',
        meta: { title: '生成订单' },
        component: () => import('@/views/main/order/order.vue'),
      },
      {
        path: 'pay',
        name: 'pay',
        meta: { title: '订单结算' },
        component: () => import('@/views/main/pay/pay.vue'),
      },
      {
        path: 'viewOrder',
        name: 'viewOrder',
        meta: { title: '查看订单' },
        component: () => import('@/views/main/viewOrder/viewOrder.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    // vue3.0  left  top 控制
    return { left: 0, top: 0 }
  },
})

router.beforeEach(async (to, from) => {
  // if (to.path !== '/login') {
  // const token = LocalCache.getCache('coderwhyToken')
  // if (!token) {
  //   return '/login'
  // }
  // }
})

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
