<template>
  <fragment>
    <user-role-dialog
      :item="editedItem"
      :on-save="updateUser"
      :on-close="closeDialog"
    />
    <users-table
      ref="table"
      :on-edit="showEditDialog"/>
  </fragment>
</template>

<script>
  import UserRoleDialog from './UserRoleDialog'
  import UsersTable from './UsersTable'
  import { Alert, resolve } from '../../../utils/Utils'
  import { Fragment } from 'vue-fragment'
  import { API_USER_ROLE } from '../../../constants/paths'

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
          url: resolve(API_USER_ROLE, { userId: user.id }),
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
      UserRoleDialog,
      Fragment
    }
  }
</script>

<style scoped>

</style>
