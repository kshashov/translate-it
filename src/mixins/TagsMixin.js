import { mapActions, mapState } from 'vuex'

export default {
  mounted () {
    this.loadTags()
  },
  computed: {
    ...mapState('tags', ['tags'])
  },
  methods: {
    ...mapActions('tags', ['loadTags'])
  }
}
