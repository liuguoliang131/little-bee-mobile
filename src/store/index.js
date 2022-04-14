import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import jurisdiction from './module/jurisdiction'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    jurisdiction
  },
  getters: {
    
  }
})
export default store