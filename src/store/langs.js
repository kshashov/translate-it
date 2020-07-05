import fetchClient from '../plugins/axios'
import { API_LANGS } from '../constants/paths'

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
        url: API_LANGS,
        method: 'GET'
      }).then(data => {
        commit('setLangs', data)
      })
    }
  },
  getters: {}
}
