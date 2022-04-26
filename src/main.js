/*
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-18 18:01:05
 * @FilePath: \little-bee-mobile\src\main.js
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'
import Axios from '@/http/index'
import api from '@/http/api'
import 'vant/lib/index.css'
import '@/style/index.less'
Vue.prototype.$http = Axios
Vue.prototype.$api = api
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
