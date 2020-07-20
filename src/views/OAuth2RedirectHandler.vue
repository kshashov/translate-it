<template>
  <v-row justify="center">
    <v-progress-circular
      indeterminate
      color="primary"
    >
    </v-progress-circular>
  </v-row>
</template>

<script>
  import { mapMutations } from 'vuex'
  import router from '../router'

  export default {
    name: 'OAuth2RedirectHandler',
    data: function () {
      return {
        token: this.$route.query.token,
        error: this.$route.query.error,
        from: this.$route.query.from
      }
    },
    created: function () {
      console.log('callback')
      if (this.token) {
        this.$store.dispatch('login', {
          token: this.token,
          from: this.from
        }).catch(() => {
          // Redirect if user not found
          this.showErrorLogin()
        })
      } else {
        // Redirect if server error
        this.showErrorLogin()
      }
    },
    methods: {
      showErrorLogin () {
        // Redirect to from page
        router.push(this.from || '/')
          .finally(() => {
            // Add login error
            this.setErrorAccess(this.error || 'Unexpected error')
          })
      },
      ...mapMutations(['setErrorAccess'])
    }
  }
</script>

<style scoped>

</style>
