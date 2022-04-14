import Vue from '@/plugins/index'
import App from './App.vue'
import router from '@/router/index'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index'
import GetApi  from '@/http/api'
import Axios from '@/http/index'
import '@/style/index.css'
// Vue.use(ElementUI)
Vue.prototype.$getApi = GetApi
Vue.prototype.$http = Axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
