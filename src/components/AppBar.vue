<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-app-bar-nav-icon v-if="canHome">
      <v-btn :to="{name: 'Home'}" class="mx-2" icon text exact>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn v-if="canLogin" @click="login" text rounded>
      <span class="mr-2">Sign In</span>
    </v-btn>

    <v-btn v-if="canUsersAdmin" :to="{name:'UsersAdmin'}" class="mr-2" small text rounded>
      Users
    </v-btn>

    <v-btn v-if="canExercisesAdmin" :to="{name:'ExercisesAdmin'}" class="mr-2" small text rounded>
      Exercises
    </v-btn>

    <v-progress-linear
      indeterminate
      color="white"
      :active="loading"
      absolute
      bottom/>

    <v-menu v-if="canLogout" offset-y>
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
        <v-list-item v-if="canProfile" :to="{name: 'Profile'}">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="canLogout" @click="logout">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  import AppBarMixin from '../mixins/AppBarMixin'
  import { mapMutations } from 'vuex'

  export default {
    name: 'AppBar',
    mixins: [AppBarMixin],
    data: function () {
      return {}
    },
    computed: {
      canUsersAdmin () {
        return this.$can('view', 'UsersAdmin')
      },
      canExercisesAdmin () {
        return this.$can('view', 'ExercisesAdmin')
      },
      canProfile () {
        return this.$can('view', 'Profile')
      },
      canHome () {
        return this.$can('view', 'Home')
      },
      canLogin () {
        return this.$can('view', 'Login')
      },
      canLogout () {
        return this.$can('view', 'Logout')
      }
    },
    methods: {
      login () {
        this.setShowLogin(true)
      },
      logout: function (event) {
        this.$store.dispatch('logout')
      },
      ...mapMutations(['setShowLogin'])
    }
  }
</script>
