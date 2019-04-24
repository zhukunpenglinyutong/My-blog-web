// 路由：可以拆分成两个，但是这里不拆，以后再拆
const routes = [
  {
    path: '/', // 首页  
    name: 'Index',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/home.vue')
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/article.vue')
  }
]

// 重新组织后导出
export default [
  ...routes
]
