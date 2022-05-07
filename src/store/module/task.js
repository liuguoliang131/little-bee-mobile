/*
 * @Date: 2022-05-07 16:17:16
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-07 16:17:40
 * @FilePath: \little-bee-mobile\src\store\module\task.js
 * @Description: 
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const task = {
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
export default task
