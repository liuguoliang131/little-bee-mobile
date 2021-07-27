import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils/index'
Vue.use(Vuex)

const user = {
  namespaced: true,
  state: {
    token:utils.getToken()||''
  },
  mutations: {
    set_token(state, data) {
      utils.setToken(data)
      state.token = data
    },
    delete_token(state) {
      utils.deleteToken(state)
      state.token = ''
    }
  },
  getters: {
    get_token: state => {
      return state.token
    }
  }
}
export default user