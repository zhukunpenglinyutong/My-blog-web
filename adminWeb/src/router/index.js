import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'


Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
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
