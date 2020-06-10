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
      if (this.token) {
        this.$store.dispatch('login', {
          token: this.token,
          from: this.from
        })
          .catch(() => {
            // Redirect if user not found
            this.redirectLogin()
          })
      } else {
        // Redirect if server error
        this.redirectLogin()
      }
    },
    methods: {
      redirectLogin () {
        this.$router.push({
          name: 'Login',
          query: {
            error: this.error || 'Unexpected error'
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
