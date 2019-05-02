// 路由：可以拆分成两个，但是这里不拆，以后再拆
const routes = [
  {
    path: '/', // 首页  
    component: () => import('../views/index.vue'), // main路由
    children: [
      {
        path:'/',
        component: () => import('../views/main/overview.vue') // 总览
      },
      {
        path:'/article',
        component: () => import('../views/main/article.vue') // 添加文章
      },
      {
        path:'md',
        component: () => import('../views/main/md.vue') // 书写文章
      },
      {
        path:'type',
        component: () => import('../views/main/type.vue') // 文章类型管理
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
