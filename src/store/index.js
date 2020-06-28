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
import lodash from 'lodash'
import { definePermissions } from '../plugins/casl'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    user: undefined,
    hasAccess: false
  },
  getters: {
    user: state => state.user,
    permissions: state => lodash.get(state.user, 'permissions'),
    authenticated: state => !!state.user,
    hasAccess: state => state.hasAccess
  },
  mutations: {
    login (state, user) {
      state.user = user
      definePermissions(user)
    },
    setHasAccess (state, hasAccess) {
      state.hasAccess = hasAccess
    },
    logout (state) {
      state.user = undefined
      definePermissions(null)
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
