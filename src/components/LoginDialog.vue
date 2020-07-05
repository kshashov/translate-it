<template>
  <v-dialog
    v-model="showLogin"
    max-width="350"
    persistent>
    <v-card>
      <v-card-title class="headline justify-center">Welcome back</v-card-title>

      <v-card-text class="text-center">
        Sign in using social media to get quick access
      </v-card-text>

      <v-card-text v-if="loginError" class="text-center" style="color:red">
        {{ loginError }}
      </v-card-text>

      <v-card-text class="py-4 px-12">
        <v-btn :href="googleUrl" color="red" block outlined>
          Google
        </v-btn>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn @click="setShowLogin(false)" color="primary" small text>No, thanks</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { GOOGLE_AUTH_URL, OAUTH2_REDIRECT_URI } from '../constants/paths'

  export default {
    name: 'LoginDialog',
    computed: {
      redirectParam () {
        return encodeURIComponent(OAUTH2_REDIRECT_URI + '?from=' + encodeURIComponent(this.$route.fullPath))
      },
      googleUrl () {
        return GOOGLE_AUTH_URL + this.redirectParam
      },
      ...mapState(['showLogin', 'loginError'])
    },
    methods: {
      ...mapMutations(['setShowLogin'])
    }
  }
</script>

<style scoped>

</style>
