<template>
  <fragment>
    <v-data-table
      :headers="headers"
      :items="users"
      :options.sync="options"
      :server-items-length="totalUsers"
      :loading="dataLoading"
      mobile-breakpoint="0">
      <template v-slot:item.name="{ item }">
        <user-name :user="item"/>
      </template>
      <template v-slot:item.role="{ item }">
        <v-tooltip top>
          <template #activator="{on, attrs}">
            <v-chip color="primary" v-on="on" v-bind="attrs" small dark>
              {{ item.role.title }}
            </v-chip>
          </template>
          {{item.role.description}}
        </v-tooltip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          @click="onEdit(item)"
          small>
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </fragment>
</template>

<script>
  import UserName from '../../../components/UserName'
  import { API_USERS } from '../../../constants/paths'
  import AppBarMixin from '../../../mixins/AppBarMixin'
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'UsersTable',
    mixins: [AppBarMixin],
    props: {
      onEdit: {
        type: Function,
        required: true
      }
    },
    data: function () {
      return {
        dataLoading: true,
        totalUsers: 0,
        users: [],
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
    created () {
      this.showSearch('Search by Name or Email')
    },
    methods: {
      getDataFromApi () {
        this.dataLoading = true
        const { sortBy, sortDesc, page, itemsPerPage } = this.options
        const direction = sortDesc[0] ? 'desc' : 'asc'
        const sort = sortBy[0] || ''

        return this.$http({
          url: API_USERS,
          method: 'GET',
          params: {
            page: page - 1,
            size: itemsPerPage,
            filter: this.search,
            sort: sort,
            direction: direction
          }
        }).then(data => {
          this.dataLoading = false
          this.users = data.items
          this.totalUsers = data.totalItems
        }).catch(response => {
          this.dataLoading = false
          this.users = []
        })
      }
    },
    components: {
      UserName,
      Fragment
    }
  }
</script>

<style scoped>

</style>
