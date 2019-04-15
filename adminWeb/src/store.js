import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mdModel: {}
    // 保存的是 md组件 中的 需要渲染的数据源，table组件可能会用上
  },
  mutations: {
    // 重置的方法
    modelClear (state) {
      state.mdModel = {}
    },
    // 赋值方法
    setModel (state, data) {
      state.mdModel = data
    }
  },
  actions: {
  }
})
