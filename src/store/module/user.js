/*
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-11 20:01:29
 * @FilePath: \little-bee-mobile\src\store\module\user.js
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils/index'
import router from '@/router/index.js'
Vue.use(Vuex)

const user = {
  namespaced: true,
  state: {
    token:utils.getToken() || '',
    userInfo:utils.getUserInfo() || null,
    code:null
  },
  mutations: {
    set_token(state, data) {
      utils.setToken(data)
      state.token = data
    },
    delete_token(state) {
      utils.deleteToken(state)
      state.token = ''
    },
    set_userInfo(state, data) {
      utils.setUserInfo(data)
      state.userInfo = data
    },
    delete_userInfo(state) {
      utils.deleteUserInfo()
      state.userInfo = null
      router.replace('/login')
    },
    set_code(state,data) {
      state.code = data
    }
  },
  getters: {
    get_token: state => {
      return state.token
    }
  },
  actions: {
    // 登录
    login( context, data ) {
      context.commit('set_userInfo', data)
      router.push('/')
    }
  }
}
export default user