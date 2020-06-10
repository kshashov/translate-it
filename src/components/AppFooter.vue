<template>
  <v-footer>
    <v-col
      class="text-center"
      cols="12"
    >
      <v-card-text class="py-2 primary--text text-center">
        {{ date }} — <a href="https://github.com/kshashov/Translates-Frontend" target="_blank">GitHub/kshashov</a>
      </v-card-text>
    </v-col>
  </v-footer>
</template>

<script>
  export default {
    name: 'AppFooter',
    data: function () {
      return {
        date: new Date().getFullYear()
      }
    }
  }
</script>

<style scoped>

</style>
