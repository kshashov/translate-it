export const snackbar = {
  namespaced: true,
  state: () => ({
    text: '',
    type: 'info'
  }),
  mutations: {
    setSnack (state, payload) {
      state.text = payload.text
      state.type = payload.type || 'info'
    }
  },
  actions: {
    setInfo ({ commit }, payload) {
      commit('setSnack', {
        ...payload,
        type: 'info'
      })
    },
    setSuccess ({ commit }, payload) {
      commit('setSnack', {
        ...payload,
        type: 'success'
      })
    },
    setError ({ commit }, payload) {
      commit('setSnack', {
        ...payload,
        type: 'error'
      })
    }
  },
  getters: {}
}
