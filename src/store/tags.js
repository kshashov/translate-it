import fetchClient from '../plugins/axios'
import { API_TAGS } from '../constants/paths'

export const tags = {
  namespaced: true,
  state: () => ({
    tags: undefined
  }),
  mutations: {
    setTags (state, payload) {
      state.tags = payload
    }
  },
  actions: {
    loadTags ({ state, commit }) {
      if (state.tags !== undefined) {
        return
      }

      return fetchClient({
        url: API_TAGS,
        method: 'GET'
      }).then(data => {
        commit('setTags', data)
      })
    }
  },
  getters: {}
}
