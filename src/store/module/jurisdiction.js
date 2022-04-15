/*
 * @Date: 2022-03-22 17:00:46
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-15 10:09:24
 * @FilePath: \vue_init\src\store\module\jurisdiction.js
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils/index'
Vue.use(Vuex)
const jurisdiction = {
  namespaced: true,
  state: {
    dynamicRoutes: utils.getDynamicRoutes()
  },
  mutations: {
    set_dynamicRoutes(state, data) {
      state.dynamicRoutes = data
      utils.setDynamicRoutes(data)
    }
  },
  actions:{
    getDynamicRoutes(context,data){
      console.log(context,data)
      return new Promise((resolve,reject)=>{
        const list = [
          {
            path:'/d1',
            meta:{
              title:'动态路由d1'
            }
          },
          {
            path:'/d2',
            meta:{
              title:'动态路由d2'
            }
          }
        ]
        context.commit('set_dynamicRoutes',list)
        resolve(list)
      })
    }
  },
  getters: {
    get_token: state => {
      return state.token
    }
  }
}
export default jurisdiction
