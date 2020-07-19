import Vue from 'vue'
import Vuex from 'vuex'
import { ACCESS_TOKEN } from '../constants'
import { getCurrentUser } from '../utils/APIUtils'
import router from '../router'
import { snackbar } from './snackbar'
import { langs } from './langs'
import { tags } from './tags'
import { roles } from './roles'
import { exercisesStats } from './exercisesStats'
import get from 'lodash/get'
import { definePermissions } from '../plugins/casl'
import { appBar } from './appBar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    showLogin: false,
    loginError: undefined,
    hasAccess: false
  },
  getters: {
    permissions: state => get(state.user, 'permissions'),
    userInfo: state => get(state.user, 'info'),
    authenticated: state => !!state.user
  },
  mutations: {
    login (state, user) {
      state.user = user
      definePermissions(user)
    },
    logout (state) {
      state.user = undefined
      definePermissions(null)
    },
    setHasAccess (state, hasAccess) {
      state.hasAccess = hasAccess
    },
    setErrorAccess (state, error) {
      state.loginError = error
      state.showLogin = true
    },
    setShowLogin (state, showLogin) {
      state.loginError = undefined
      state.showLogin = showLogin
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
    snack: snackbar,
    langs: langs,
    tags: tags,
    roles: roles,
    exercisesStats: exercisesStats,
    appBar: appBar
  }
})
