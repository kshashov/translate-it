import { mapActions, mapState } from 'vuex'

export default {
  mounted () {
    this.loadExercisesStats()
  },
  computed: {
    ...mapState('exercisesStats', ['exercisesStats'])
  },
  methods: {
    ...mapActions('exercisesStats', ['loadExercisesStats'])
  }
}
