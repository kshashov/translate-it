<template>
  <div class="pa-4">
    <v-row justify="center" class="pa-4">
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="loading"
      />
      <v-col v-else :v-cols="4">
        <v-card
          :key="exercise.id"
          v-for="exercise in exercises"
        >
          <v-card-title>
            {{exercise.title}}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-pagination
      v-model="options.page"
      :length="totalExercises"
      :total-visible="5"
    ></v-pagination>
  </div>
</template>

<script>
  import { request } from '../utils/APIUtils'

  export default {
    name: 'Home',
    components: {},
    data: function () {
      return {
        editedItem: undefined,
        totalExercises: 0,
        exercises: [],
        loading: true,
        options: {
          page: 1,
          itemsPerPage: 10
        }
      }
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      getDataFromApi () {
        this.loading = true

        return request({
          url: `/api/exercises/?page=${this.options.page - 1}&size=${this.options.itemsPerPage}`,
          method: 'GET'
        }).then(data => {
          this.loading = false
          this.exercises = data.items
          this.totalExercises = data.totalPages
        }).catch(response => {
          this.loading = false
          this.exercises = []
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
      }
    }
  }
</script>

<style scoped>

</style>
