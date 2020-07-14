<template>
  <error-page
    :status="401"
    title="Whoops"
    text="You need to login to view this content"
  >
    <template #actions>
      <v-btn
        @click="setShowLogin(true)"
        color="primary"
        outlined>Sign In
      </v-btn>
    </template>
  </error-page>
</template>

<script>
  import ErrorPage from '../components/ErrorPage'
  import { mapMutations } from 'vuex'

  export default {
    name: 'SignIn',
    data: function () {
      return {
        from: this.$route.query.from
      }
    },
    methods: {
      ...mapMutations(['setShowLogin'])
    },
    components: {
      ErrorPage
    }
  }
</script>

<style scoped>

</style>
