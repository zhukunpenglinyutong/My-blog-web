import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'
import { checkToken } from '../api/index.js'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

// 路由全局守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    // console.log('store.state.islogin', store.state.islogin)
    // 验证 token 是否过期
    let token = localStorage.getItem('token')
    if (token) { // 登录了，然后就是验证 token 是否过期
      checkToken({token}).then(res => {
        console.log('验证token是否过期', res)
        if (res.data.jie) { // token 正常
          next()
        } else { // token 失效
          next('/login')
        }
      })
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
