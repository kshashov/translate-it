import { request } from '../utils/APIUtils'

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
      return request({
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
