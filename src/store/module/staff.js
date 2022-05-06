/*
 * @Date: 2022-05-06 18:38:20
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-06 18:45:55
 * @FilePath: \little-bee-mobile\src\store\module\staff.js
 * @Description: 
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const staff = {
  namespaced: true,
  state: {
    item: null
  },
  mutations: {
    set_item(state,data) {
      console.log('data',data)
      state.item = data
    }
  },
  actions:{
   
  },
  getters: {
    
  }
}
export default staff
