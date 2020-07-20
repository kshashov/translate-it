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
        <v-btn
          :key="client.title"
          v-for="client in clients"
          :href="getClientUrl(client)"
          color="primary"
          class="mb-1"
          block outlined>
          {{client.title}}
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
  import { API_BASE_URL, API_OAUTH_CLIENTS } from '../constants/paths'

  export default {
    name: 'LoginDialog',
    data: function () {
      return {
        clients: []
      }
    },
    created () {
      console.log()
      this.$http
        .get(API_OAUTH_CLIENTS)
        .then(clients => {
          this.clients = clients
        })
    },
    computed: {
      redirectParam () {
        const host = window.location.origin
        const callback = host + this.$router.resolve({ name: 'OAuth2RedirectHandler' }).href
        return encodeURIComponent(callback + '?from=' + encodeURIComponent(this.$route.fullPath))
      },
      ...mapState(['showLogin', 'loginError'])
    },
    methods: {
      getClientUrl (client) {
        return API_BASE_URL + client.url + '?redirect_uri=' + this.redirectParam
      },
      ...mapMutations(['setShowLogin'])
    }
  }
</script>

<style scoped>

</style>
