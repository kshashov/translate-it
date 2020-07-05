<template>
  <v-row
    align="center"
    justify="center"
    class="fill-height"
  >
    <v-col
      cols="10"
      sm="10"
      md="4"
    >
      <v-card class="elevation-10 pa-4">
        <v-toolbar
          flat
        >
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text v-if="error">
          <v-alert type="error">
            {{error}}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn :href="googleUrl" color="red" block outlined>
            Google
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { OAUTH2_REDIRECT_URI, GOOGLE_AUTH_URL } from '../constants/paths'

  export default {
    name: 'Login',
    data: function () {
      return {
        from: this.$route.query.from || '',
        error: this.$route.query.error
      }
    },
    computed: {
      googleUrl () {
        return GOOGLE_AUTH_URL + encodeURIComponent(OAUTH2_REDIRECT_URI + '?from=' + encodeURIComponent(this.from))
      }
    }
  }
</script>

<style scoped>

</style>
