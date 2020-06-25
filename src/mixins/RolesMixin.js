import { mapActions, mapState } from 'vuex'

export default {
  mounted () {
    this.loadRoles()
  },
  computed: {
    ...mapState('roles', ['roles'])
  },
  methods: {
    ...mapActions('roles', ['loadRoles'])
  }
}
