<template>
  <v-row v-if="loading" justify="center" class="mx-10">
    <v-progress-circular
      indeterminate
      color="primary"
    >
    </v-progress-circular>
  </v-row>
  <v-app v-else :style="{background: $vuetify.theme.themes[isDark].background}">
    <app-bar/>
    <v-content>
      <v-row justify="center" class="fill-height ma-0">
        <v-container class="pa-0">
          <protected-component :key="$route.path"></protected-component>
        </v-container>
      </v-row>
    </v-content>
    <app-footer/>
  </v-app>
</template>

<script>
  import AppBar from './components/AppBar'
  import AppFooter from './components/AppFooter'
  import ProtectedComponent from './views/ProtectedComponent'

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
    beforeMount () {
      this.loading = false
    },
    components: {
      ProtectedComponent,
      AppFooter,
      AppBar
    }
  }
</script>
