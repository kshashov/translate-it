import { mapActions, mapState } from 'vuex'

export default {
  mounted () {
    this.loadLangs()
  },
  computed: {
    ...mapState('langs', ['langs'])
  },
  methods: {
    ...mapActions('langs', ['loadLangs'])
  }
}
