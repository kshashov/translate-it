<template>
  <v-btn
    v-if="canEdit"
    @click="viewExercise"
    class="mr-2"
    color="accent"
    small rounded>
    <v-icon small left>mdi-pencil</v-icon>
    Edit
  </v-btn>
</template>

<script>
  export default {
    name: 'ExerciseAppBar',
    props: ['id'],
    computed: {
      canEdit () {
        return this.$can('view', 'ExerciseEdit')
      }
    },
    methods: {
      viewExercise () {
        this.$router.push({
          name: 'ExerciseEdit',
          params: {
            id: this.id
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
