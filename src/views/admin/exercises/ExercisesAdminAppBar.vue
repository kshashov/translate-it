<template>
  <v-btn
    @click="createExercise"
    class="mr-2"
    color="accent"
    small rounded>
    <v-icon small left>mdi-plus</v-icon>
    Create
  </v-btn>
</template>

<script>
  export default {
    name: 'ExercisesAdminAppBar',
    methods: {
      createExercise () {
        this.$eventBus.$emit('createExercise')
      }
    }
  }
</script>

<style scoped>

</style>
