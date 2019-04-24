import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/index.vue'
import Login from './views/login.vue' 

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/', // 首页  
      component: Home,
      children: [
        {
          path:'/',
          component: () => import('./views/home.vue')
        },
        {
          path:'md',
          component: () => import('./views/md.vue')
        },
        {
          path:'type',
          component: () => import('./views/type.vue')
        }
      ]
    },
    {
      path: '/login', // 登录
      component: Login
    }
  ]
})

// 路由全局守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.islogin) { // 登录了
      next()
    } else { // 未登录
      next('/login')
      // router.push({ name: '/login' })
    }
  } else {
    next()
  }
})

export default router
