import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

// // 路由拦截, 权限验证（导航守卫）
// router.beforeEach((to, from, next) => {})

export default router
