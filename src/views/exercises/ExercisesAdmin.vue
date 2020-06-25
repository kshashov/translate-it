<template>
  <div class="pa-4">
    <steps-dialog
      :item="editedSteps"
      :on-save="onSaveSteps"
      :on-close="closeStepsDialog"
    />
    <exercise-dialog
      :item="editedItem"
      :langs="langs"
      :tags="tags"
      :on-save="onSaveExercise"
      :on-close="closeUpdateDialog"
    />
    <exercises-table
      ref="table"
      :langs="langs"
      :tags="tags"
      :on-delete="showDeleteDialog"
      :on-edit="showUpdateDialog"
      :on-edit-steps="showStepsDialog"
      :on-create="showCreateDialog"
    />
  </div>
</template>

<script>
  import { request } from '../../utils/APIUtils'
  import ExerciseDialog from './ExerciseDialog'
  import ExercisesTable from './ExercisesTable'
  import { Alert } from '../../utils/Utils'
  import StepsDialog from './StepsDialog'
  import LangsMixin from '../../mixins/LangsMixin'
  import TagsMixin from '../../mixins/TagsMixin'

  export default {
    name: 'ExercisesAdmin',
    mixins: [
      LangsMixin, TagsMixin
    ],
    data: function () {
      return {
        editedSteps: undefined,
        editedItem: undefined
      }
    },
    methods: {
      onSaveExercise (exercise) {
        if (exercise.id !== undefined) {
          request({
            url: '/api/exercises/' + exercise.id,
            method: 'PUT',
            data: JSON.stringify(exercise)
          }).then((result) => {
            Alert.success('Exercise has been updated')
            this.$refs.table.getDataFromApi()
            this.closeUpdateDialog()
          })
        } else {
          request({
            url: '/api/exercises/',
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
        request({
          url: `/api/exercises/${exerciseId}/steps`,
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
        request({
          url: `api/exercises/${exercise.id}/steps`,
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
          request({
            url: '/api/exercises/' + exercise.id,
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
      StepsDialog
    }
  }
</script>

<style scoped>

</style>
