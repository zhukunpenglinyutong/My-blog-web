// 路由：可以拆分成两个，但是这里不拆，以后再拆
const routes = [
  {
    path: '/', // 首页  
    component: () => import('../views/index.vue'),
    children: [
      {
        path:'/',
        component: () => import('../views/home.vue')
      },
      {
        path:'md',
        component: () => import('../views/md.vue')
      },
      {
        path:'type',
        component: () => import('../views/type.vue')
      }
    ]
  },
  {
    path: '/login', // 登录
    component: () => import('../views/login.vue')
  }
]

// 重新组织后导出
export default [
  ...routes
]
