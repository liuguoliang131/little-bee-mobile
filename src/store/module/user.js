/*
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-08 16:06:06
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
    token: utils.getToken() || '',
    userInfo: utils.getUserInfo() || null,
    code: utils.getCode() || null,
    openId: utils.getOpenId() || null
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
    set_code(state, data) {
      state.code = data
      utils.setCode(data)
    },
    set_openId(state, data) {
      state.openId = data
      utils.setOpenId(data)
    }
  },
  getters: {
    get_token: state => {
      return state.token
    }
  },
  actions: {
    // 登录
    async login(context, data) {
      await context.commit('set_userInfo', data)
      // 企业登陆or员工登陆
      router.push(data.origin)
      // if (data.type === '1' || !data.type) {
      //   router.push(data.origin)
      // } else if(data.type === '2'){
      //   let query = `employeeId=${data.employeeId}&statisticsData=${utils.getToday()}`
      //   router.push(`/wechatPushOperation?${query}`)
      // }

    }
  }
}
export default user