<template>
  <div class="pa-4">
    <user-role-dialog
      :item="editedItem"
      :on-save="updateUser"
      :on-close="closeDialog"
    />
    <users-table
      ref="table"
      :on-edit="showEditDialog"/>
  </div>
</template>

<script>
  import UserRoleDialog from './UserRoleDialog'
  import UsersTable from './UsersTable'
  import { Alert } from '../../utils/Utils'

  export default {
    name: 'UsersAdmin',
    data: function () {
      return {
        editedItem: undefined
      }
    },
    methods: {
      showEditDialog (item) {
        this.editedItem = item
      },
      closeDialog () {
        this.editedItem = undefined
      },
      updateUser (user) {
        return this.$http({
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
