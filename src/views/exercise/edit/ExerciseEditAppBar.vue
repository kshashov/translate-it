<template>
  <v-btn
    v-if="canEdit"
    @click="viewExercise"
    class="mr-2"
    color="accent"
    small rounded>
    View
  </v-btn>
</template>

<script>
  export default {
    name: 'ExerciseEditAppBar',
    props: ['id'],
    computed: {
      canEdit () {
        return this.$can('view', 'ExerciseEdit')
      }
    },
    methods: {
      viewExercise () {
        this.$router.push({
          name: 'Exercise',
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
