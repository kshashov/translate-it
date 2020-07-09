<template>
  <fragment>
    <exercise-dialog
      :item="editedItem"
      :on-save="onCreateExercise"
      :on-close="closeCreateDialog"
    />
    <exercises-table
      ref="table"
      :on-delete="showDeleteDialog"
      :on-create="showCreateDialog"
    />
  </fragment>
</template>

<script>
  import ExerciseDialog from './ExerciseDialog'
  import ExercisesTable from './ExercisesTable'
  import { Alert, resolve } from '../../../utils/Utils'
  import { Fragment } from 'vue-fragment'
  import { API_EXERCISE, API_EXERCISES } from '../../../constants/paths'

  export default {
    name: 'ExercisesAdmin',
    data: function () {
      return {
        editedSteps: undefined,
        editedItem: undefined
      }
    },
    methods: {
      onCreateExercise (exercise) {
        this.$http({
          url: API_EXERCISES,
          method: 'POST',
          data: JSON.stringify(exercise)
        }).then((result) => {
          Alert.success('Exercise has been created')
          this.$refs.table.getDataFromApi()
          this.closeUpdateDialog()
        })
      },
      showCreateDialog () {
        this.editedItem = {
          title: undefined,
          tags: undefined,
          from: undefined,
          to: undefined,
          creator: this.$store.state.user.info
        }
      },
      async showDeleteDialog (exercise) {
        if (await this.$root.$confirm('Delete', 'Are you sure?', { color: 'info' })) {
          this.$http({
            url: resolve(API_EXERCISE, { exerciseId: exercise.id }),
            method: 'DELETE'
          }).then(() => {
            Alert.success('Exercise has been deleted')
            this.$refs.table.getDataFromApi()
          })
        }
      },
      closeCreateDialog () {
        this.editedItem = undefined
      }
    },
    components: {
      ExercisesTable,
      ExerciseDialog,
      Fragment
    }
  }
</script>

<style scoped>

</style>
