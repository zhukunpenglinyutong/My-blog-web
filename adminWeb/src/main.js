import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './router/index'
import store from './store'

// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// Vue.use(mavonEditor)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入自己的组件
import docsifyMd from './components/docsify-md/index'
Vue.use(docsifyMd)

// 引入 highcharts
import VueHighcharts from 'vue-highcharts';
Vue.use(VueHighcharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app1')
