import Vue from 'vue'
import Vuex from 'vuex'
import { ACCESS_TOKEN } from '../constants'
import { getCurrentUser } from '../utils/APIUtils'
import router from '../router'
import { snackbar } from './snackbar'
import { hasPermissions } from '../utils/Utils'
import { langs } from './langs'
import { tags } from './tags'
import { roles } from './roles'
import { exercisesStats } from './exercisesStats'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    user: undefined,
    hasAccess: false
  },
  getters: {
    user: state => state.user,
    permissions: state => state.user ? state.user.permissions : undefined,
    authenticated: state => !!state.user,
    hasAccess: state => state.hasAccess
  },
  mutations: {
    login (state, user) {
      state.user = user
    },
    validatePermissions (state, permissions) {
      state.hasAccess = hasPermissions(state.user, permissions)
    },
    logout (state) {
      state.user = undefined
    },
    title (state, title) {
      state.title = title || 'Translates'
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
    exercisesStats: exercisesStats
  }
})
