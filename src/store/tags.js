import { request } from '../utils/APIUtils'

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

      return request({
        url: '/api/tags/',
        method: 'GET'
      }).then(data => {
        commit('setTags', data)
      })
    }
  },
  getters: {}
}
