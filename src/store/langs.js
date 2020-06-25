import fetchClient from '../plugins/axios'

export const langs = {
  namespaced: true,
  state: () => ({
    langs: undefined
  }),
  mutations: {
    setLangs (state, payload) {
      state.langs = payload
    }
  },
  actions: {
    loadLangs ({ state, commit }) {
      if (state.langs !== undefined) {
        return
      }

      return fetchClient({
        url: '/api/langs/',
        method: 'GET'
      }).then(data => {
        commit('setLangs', data)
      })
    }
  },
  getters: {}
}
