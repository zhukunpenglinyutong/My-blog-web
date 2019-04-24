import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mdModel: {},
    // 保存的是 md组件 中的 需要渲染的数据源，table组件可能会用上
    login: null, // 登录信息
    islogin: false // 是否登录
  },
  mutations: {
    
    // 重置的方法
    modelClear (state) {
      state.mdModel = {}
    },

    // 赋值方法
    setModel (state, data) {
      state.mdModel = data
    },

    setLogin (state, data) { // 赋值登录信息
      state.login = data
    },

    setIsLogin (state, data) { // 登录
      state.islogin = data
    },

    clearLogin () { // 清除登录信息（退出的时候）
      state.login = null
    },

    clearIsLogin () { // 退出登录
      state.islogin = false
    }

  },
  actions: {
  }
})
