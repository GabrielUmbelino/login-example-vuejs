import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    token: null
  },
  mutations: {
    "LOGIN"(state, userData) {
      state.userId = userData.userId;
      state.token = userData.token;
    }
  },
  getters: {
    loggedIn(state) {
      return Boolean(state.token)
    }
  },
  actions: {
    login({
      commit
    }, userData) {
      commit("LOGIN", userData)
    }
  }
})