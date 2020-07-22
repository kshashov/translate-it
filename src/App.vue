<template>
  <v-flex>
    <confirm ref="confirm"></confirm>
    <v-app :style="{background: $vuetify.theme.themes[isDark].background}">
      <snackbar/>
      <app-bar/>
      <LoginDialog/>
      <v-main>
        <v-row justify="center" class="fill-height ma-0">
          <v-container style="max-width: 1000px" class="pa-4" fluid>
            <protected-component>
              <router-view/>
            </protected-component>
          </v-container>
        </v-row>
      </v-main>
      <app-footer/>
    </v-app>
  </v-flex>
</template>

<script>
  import AppBar from './components/AppBar'
  import AppFooter from './components/AppFooter'
  import ProtectedComponent from './components/ProtectedComponent'
  import Snackbar from './components/Snackbar'
  import Confirm from './components/Confirm'
  import { mapState } from 'vuex'
  import LoginDialog from './components/LoginDialog'
  import store from './store'

  export default {
    name: 'App',
    computed: {
      isDark () {
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      },
      ...mapState('appBar', ['title'])
    },
    watch: {
      title: {
        handler (title) {
          document.title = title || 'Translate-It'
        },
        immediate: true
      }
    },
    created () {
      store.dispatch('init')
        .finally(() => {
          store.dispatch('authorize', this.$route)
        })
    },
    mounted () {
      this.$root.$confirm = this.$refs.confirm.open
    },
    components: {
      LoginDialog,
      ProtectedComponent,
      AppFooter,
      AppBar,
      Snackbar,
      Confirm
    }
  }
</script>
