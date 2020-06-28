import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('appBar', ['title', 'loading'])
  },
  methods: {
    ...mapMutations('appBar', ['setTitle', 'setLoading', 'startLoading', 'stopLoading'])
  }
}
