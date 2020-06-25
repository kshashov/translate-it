import fetchClient from '../plugins/axios'

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

      fetchClient({
        url: '/api/roles/',
        method: 'GET'
      }).then(data => {
        commit('setRoles', data)
      })
    }
  },
  getters: {}
}
