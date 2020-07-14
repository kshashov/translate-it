
export const appBar = {
  namespaced: true,
  state: () => ({
    title: 'Translates',
    loading: false,
    search: '',
    searchEnabled: false,
    searchPlaceHolder: ''
  }),
  mutations: {
    setTitle (state, title) {
      state.title = title || ''
    },

    setLoading (state, loading) {
      state.loading = loading
    },
    startLoading (state) {
      state.loading = true
    },
    stopLoading (state) {
      state.loading = false
    },

    showSearch (state, placeHolder) {
      state.search = ''
      state.searchEnabled = true
      state.searchPlaceHolder = placeHolder
    },
    hideSearch (state, placeHolder) {
      state.search = ''
      state.searchEnabled = false
      state.searchPlaceHolder = ''
    },
    setSearchText (state, search) {
      state.search = search
    }
  },
  actions: {
  },
  getters: {}
}
