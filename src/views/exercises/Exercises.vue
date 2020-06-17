<template>
  <div class="pa-4">
    <exercise-dialog
      :item="editedItem"
      :on-save="onUserUpdate"
      :on-close="closeDialog"
    />
    <exercises-table
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

  export default {
    name: 'Exercises',
    data: function () {
      return {
        editedItem: undefined,
        langs: undefined,
        tags: undefined
      }
    },
    beforeMount () {
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
      showEditDialog (item) {
        this.editedItem = item
      },
      closeDialog () {
        this.editedItem = undefined
      },
      onUserUpdate (user) {
        return request({
          url: '/api/users/' + user.id + '/role',
          method: 'POST',
          data: JSON.stringify({ id: user.role.id })
        }).then((result) => {
          this.getDataFromApi()
          this.closeDialog()
        }).catch(() => {
        })
      },
      showCreateDialog () {

      },
      showUpdateDialog (user) {

      },
      showDeleteDialog (user) {

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
