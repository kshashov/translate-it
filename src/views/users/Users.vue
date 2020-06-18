<template>
  <div class="pa-4">
    <user-role-dialog
      :item="editedItem"
      :roles="roles"
      :on-save="updateUser"
      :on-close="closeDialog"
    />
    <users-table
      ref="table"
      :on-edit="showEditDialog"/>
  </div>
</template>

<script>
  import { request } from '../../utils/APIUtils'
  import UserRoleDialog from './UserRoleDialog'
  import UsersTable from './UsersTable'
  import { Alert } from '../../utils/Utils'

  export default {
    name: 'Users',
    data: function () {
      return {
        editedItem: undefined,
        roles: undefined
      }
    },
    mounted () {
      // load roles
      request({
        url: '/api/roles/',
        method: 'GET'
      }).then(items => {
        this.roles = items
      })
    },
    methods: {
      showEditDialog (item) {
        this.editedItem = item
      },
      closeDialog () {
        this.editedItem = undefined
      },
      updateUser (user) {
        return request({
          url: '/api/users/' + user.id + '/role',
          method: 'POST',
          data: JSON.stringify({ id: user.role.id })
        }).then((result) => {
          Alert.success('User has been updated')
          this.$refs.table.getDataFromApi()
          this.closeDialog()
        }).catch(() => {
        })
      }
    },
    components: {
      UsersTable,
      UserRoleDialog
    }
  }
</script>

<style scoped>

</style>
