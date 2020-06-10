import Vue from 'vue'
import Vuex from 'vuex'
import { ACCESS_TOKEN } from '../constants'
import { getCurrentUser } from '../utils/APIUtils'
import router from '../router'
import { snackbar } from './snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined
  },
  getters: {
    user: state => state.user,
    authenticated: state => !!state.user
  },
  mutations: {
    login (state, user) {
      state.user = user
      state.authenticated = true
    },
    logout (state) {
      state.user = undefined
      state.authenticated = false
    }
  },
  actions: {
    async init ({ commit }) {
      try {
        if (localStorage.getItem(ACCESS_TOKEN)) {
          const response = await getCurrentUser()
          commit('login', response)
        }
      } catch (e) {
      }
    },
    login ({ commit }, payload) {
      localStorage.setItem(ACCESS_TOKEN, payload.token)
      return getCurrentUser()
        .then(response => {
          commit('login', response)
          // Redirect to from page
          router.push(payload.from || '/')
        })
    },
    logout ({ commit }) {
      localStorage.removeItem(ACCESS_TOKEN)
      commit('logout')
      router.push({ name: 'Home' })
        .catch(() => {
        })
    }
  },
  modules: {
    snack: snackbar
  }
})
