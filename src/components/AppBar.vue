<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-app-bar-nav-icon>
      <v-btn :to="{name: 'Home'}" class="mx-2" icon text exact>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn v-if="!authenticated" :to="{name:'Login'}" text rounded>
      <span class="mr-2">Sign In</span>
    </v-btn>

    <v-btn v-if="authenticated && hasUsersPermission" :to="{name:'UsersAdmin'}" class="mr-2" small text rounded>
      Users
    </v-btn>

    <v-btn v-if="authenticated && hasExercisesPermission" :to="{name:'ExercisesAdmin'}" class="mr-2" small text rounded>
      Exercises
    </v-btn>

    <v-menu v-if="authenticated" offset-y>
      <template v-slot:activator="{on}">
        <v-btn
          color="white lighten-2"
          v-on="on"
          text icon
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item :to="{name: 'Profile'}">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { hasPermissions } from '../utils/Utils'
  import { requiredPermissions } from '../constants'

  export default {
    name: 'AppBar',
    data: function () {
      return {}
    },
    computed: {
      hasUsersPermission () {
        return hasPermissions(this.user, requiredPermissions.manageUsers)
      },
      hasExercisesPermission () {
        return hasPermissions(this.user, requiredPermissions.manageExercises)
      },
      ...mapGetters(['user', 'authenticated']),
      ...mapState(['title'])
    },
    methods: {
      logout: function (event) {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped>

</style>
