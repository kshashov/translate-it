<template>
  <fragment>
    <steps-dialog
      :item="editedSteps"
      :on-save="onSaveSteps"
      :on-close="closeStepsDialog"
    />
    <exercise-dialog
      :item="editedItem"
      :on-save="onSaveExercise"
      :on-close="closeUpdateDialog"
    />
    <exercises-table
      ref="table"
      :on-delete="showDeleteDialog"
      :on-edit="showUpdateDialog"
      :on-edit-steps="showStepsDialog"
      :on-create="showCreateDialog"
    />
  </fragment>
</template>

<script>
  import ExerciseDialog from './ExerciseDialog'
  import ExercisesTable from './ExercisesTable'
  import { Alert, resolve } from '../../../utils/Utils'
  import StepsDialog from './StepsDialog'
  import { Fragment } from 'vue-fragment'
  import { API_EXERCISE, API_EXERCISE_STEPS, API_EXERCISES } from '../../../constants/paths'

  export default {
    name: 'ExercisesAdmin',
    data: function () {
      return {
        editedSteps: undefined,
        editedItem: undefined
      }
    },
    methods: {
      onSaveExercise (exercise) {
        if (exercise.id !== undefined) {
          this.$http({
            url: resolve(API_EXERCISE, { exerciseId: exercise.id }),
            method: 'PUT',
            data: JSON.stringify(exercise)
          }).then((result) => {
            Alert.success('Exercise has been updated')
            this.$refs.table.getDataFromApi()
            this.closeUpdateDialog()
          })
        } else {
          this.$http({
            url: API_EXERCISES,
            method: 'POST',
            data: JSON.stringify(exercise)
          }).then((result) => {
            Alert.success('Exercise has been created')
            this.$refs.table.getDataFromApi()
            this.closeUpdateDialog()
          })
        }
      },
      onSaveSteps (exerciseId, steps) {
        this.$http({
          url: resolve(API_EXERCISE_STEPS, { exerciseId: exerciseId }),
          method: 'POST',
          data: JSON.stringify(steps)
        }).then((result) => {
          Alert.success('Steps have been updated')
          this.closeStepsDialog()
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
      showUpdateDialog (exercise) {
        this.editedItem = exercise
      },
      showStepsDialog (exercise) {
        this.$http({
          url: resolve(API_EXERCISE_STEPS, { exerciseId: exercise.id }),
          method: 'GET'
        }).then((result) => {
          this.editedSteps = {
            exerciseId: exercise.id,
            steps: result
          }
        })
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
      closeUpdateDialog () {
        this.editedItem = undefined
      },
      closeStepsDialog () {
        this.editedSteps = undefined
      }
    },
    components: {
      ExercisesTable,
      ExerciseDialog,
      StepsDialog,
      Fragment
    }
  }
</script>

<style scoped>

</style>
