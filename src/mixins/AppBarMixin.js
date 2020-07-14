import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('appBar', [
      'title',
      'loading',
      'search',
      'searchPlaceHolder',
      'searchEnabled'
    ])
  },
  methods: {
    ...mapMutations('appBar', [
      'setTitle',
      'setLoading',
      'startLoading',
      'stopLoading',
      'showSearch',
      'hideSearch',
      'setSearchText'
    ])
  }
}
