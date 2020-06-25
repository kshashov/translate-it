import { request } from '../utils/APIUtils'

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

      request({
        url: '/api/roles/',
        method: 'GET'
      }).then(data => {
        commit('setRoles', data)
      })
    }
  },
  getters: {}
}
