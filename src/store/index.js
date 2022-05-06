/*
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-06 18:40:17
 * @FilePath: \little-bee-mobile\src\store\index.js
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import jurisdiction from './module/jurisdiction'
import staff from './module/staff'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    jurisdiction,
    staff
  },
  getters: {
    
  }
})
export default store