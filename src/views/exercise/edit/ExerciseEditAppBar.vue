<template>
  <v-btn
    v-if="canView"
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
      canView () {
        return this.$can('view', 'Exercise')
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
