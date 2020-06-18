<template>
  <div class="pa-4">
    <exercise-dialog
      :item="editedItem"
      :langs="langs"
      :tags="tags"
      :on-save="onSave"
      :on-close="closeUpdateDialog"
    />
    <exercises-table
      ref="table"
      :langs="langs"
      :tags="tags"
      :on-delete="showDeleteDialog"
      :on-edit="showUpdateDialog"
      :on-create="showCreateDialog"
    />
  </div>
</template>

<script>
  import { request } from '../../utils/APIUtils'
  import ExerciseDialog from './ExerciseDialog'
  import ExercisesTable from './ExercisesTable'
  import { Alert } from '../../utils/Utils'

  export default {
    name: 'Exercises',
    data: function () {
      return {
        editedItem: undefined,
        langs: undefined,
        tags: undefined
      }
    },
    mounted () {
      this.loadLangs()
      this.loadTags()
    },
    methods: {
      loadTags () {
        return request({
          url: '/api/tags/',
          method: 'GET'
        }).then(data => {
          this.tags = data
        })
      },
      loadLangs () {
        return request({
          url: '/api/langs/',
          method: 'GET'
        }).then(data => {
          this.langs = data
        })
      },
      onSave (exercise) {
        console.log('save exercise')
        console.log(exercise)
        if (exercise.id !== undefined) {
          return request({
            url: '/api/exercises/' + exercise.id,
            method: 'PUT',
            data: JSON.stringify(exercise)
          }).then((result) => {
            Alert.success('Exercise has been updated')
            this.$refs.table.getDataFromApi()
            this.closeUpdateDialog()
          })
        } else {
          return request({
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
      showCreateDialog () {
        this.editedItem = { creator: this.$store.state.user.info }
      },
      closeUpdateDialog () {
        this.editedItem = undefined
      },
      showUpdateDialog (exercise) {
        this.editedItem = exercise
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
      }
    },
    components: {
      ExercisesTable,
      ExerciseDialog
    }
  }
</script>

<style scoped>

</style>
