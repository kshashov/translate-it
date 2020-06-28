
export const appBar = {
  namespaced: true,
  state: () => ({
    title: 'Translates',
    loading: false
  }),
  mutations: {
    setTitle (state, title) {
      state.title = title || 'Translates'
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    startLoading (state) {
      state.loading = true
    },
    stopLoading (state) {
      state.loading = false
    }
  },
  actions: {
  },
  getters: {}
}
