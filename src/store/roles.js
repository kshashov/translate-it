import fetchClient from '../plugins/axios'
import { API_ROLES } from '../constants/paths'

export const roles = {
  namespaced: true,
  state: () => ({
    roles: undefined
  }),
  mutations: {
    setRoles (state, payload) {
      state.roles = payload
    }
  },
  actions: {
    loadRoles ({ state, commit }) {
      if (state.roles !== undefined) {
        return
      }

      return fetchClient({
        url: API_ROLES,
        method: 'GET'
      }).then(data => {
        commit('setRoles', data)
      })
    }
  },
  getters: {}
}
