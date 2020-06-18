<template>
  <v-flex>
    <confirm ref="confirm"></confirm>
    <v-row v-if="loading" justify="center" class="mx-10">
      <snackbar/>
      <v-col cols="12">
        <v-progress-circular
          indeterminate
          color="primary"/>
      </v-col>
    </v-row>
    <v-app v-else :style="{background: $vuetify.theme.themes[isDark].background}">
      <snackbar/>
      <app-bar/>
      <v-content>
        <v-row justify="center" class="fill-height ma-0">
          <v-container style="max-width: 1000px" class="pa-0" fluid>
            <protected-component>
              <router-view/>
            </protected-component>
          </v-container>
        </v-row>
      </v-content>
      <app-footer/>
    </v-app>
  </v-flex>
</template>

<script>
  import AppBar from './components/AppBar'
  import AppFooter from './components/AppFooter'
  import ProtectedComponent from './views/ProtectedComponent'
  import Snackbar from './components/Snackbar'
  import Confirm from './components/Confirm'

  export default {
    name: 'App',
    data: () => ({
      loading: true
    }),
    computed: {
      isDark () {
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      }
    },
    watch: {
      $route (to, from) {
        document.title = to.meta.title || 'Translates'
      }
    },
    beforeMount () {
      this.loading = false
    },
    mounted () {
      this.$root.$confirm = this.$refs.confirm.open
    },
    components: {
      ProtectedComponent,
      AppFooter,
      AppBar,
      Snackbar,
      Confirm
    }
  }
</script>
