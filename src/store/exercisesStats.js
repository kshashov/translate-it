import fetchClient from '../plugins/axios'

export const exercisesStats = {
  namespaced: true,
  state: () => ({
    exercisesStats: undefined
  }),
  mutations: {
    setExercisesStats (state, payload) {
      state.exercisesStats = payload
    }
  },
  actions: {
    loadExercisesStats ({ commit }) {
      return fetchClient({
        url: '/api/exercises/stats',
        method: 'GET'
      }).then(data => {
        console.log(data)
        commit('setExercisesStats', data)
      })
    }
  },
  getters: {}
}
