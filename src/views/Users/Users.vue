<template>
  <div class="pa-4">
    <user-role-dialog
      :item="editedItem"
      :on-save="onUserUpdate"
      :on-close="closeDialog"
    />
    <h1 class="title pb-2">Users</h1>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :options.sync="options"
        :server-items-length="totalDesserts"
        :loading="loading"
        mobile-breakpoint="0"
      >
        <template v-slot:item.role="{ item }">
          <v-chip color="primary" dark>{{ item.role.title }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            @click="() => { showEditDialog(item) }"
            small
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import { request } from '../../utils/APIUtils'
  import UserRoleDialog from './UserRoleDialog'

  export default {
    name: 'Users',
    components: { UserRoleDialog },
    data: function () {
      return {
        search: '',
        editedItem: undefined,
        totalDesserts: 0,
        desserts: [],
        loading: true,
        options: {},
        headers: [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'Role',
            value: 'role'
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false
          }
        ]
      }
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      },
      search: function () {
        this.getDataFromApi()
      }
    },
    mounted () {
      // this.getDataFromApi()
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        const { sortBy, sortDesc, page, itemsPerPage } = this.options
        const direction = sortDesc[0] ? 'desc' : 'asc'
        const sort = sortBy[0] || ''

        return request({
          url: `/api/users/?page=${page - 1}&size=${itemsPerPage}&filter=${this.search}&sort=${sort}&direction=${direction}`,
          method: 'GET'
        }).then(data => {
          this.loading = false
          this.desserts = data.items
          this.totalDesserts = data.totalItems
        }).catch(response => {
          this.loading = false
          this.desserts = []
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
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
