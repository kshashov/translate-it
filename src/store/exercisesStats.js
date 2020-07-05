import fetchClient from '../plugins/axios'
import { API_EXERCISES_STATS } from '../constants/paths'

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
        url: API_EXERCISES_STATS,
        method: 'GET'
      }).then(data => {
        commit('setExercisesStats', data)
      })
    }
  },
  getters: {}
}
