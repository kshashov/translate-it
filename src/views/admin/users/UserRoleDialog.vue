<template>
  <v-dialog v-model="visible" v-if="visible" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Edit User</span>
      </v-card-title>

      <v-card-text>
        <user-role-form
          ref="userRoleForm"
          :item="item"
          :invalid.sync="invalid"
          :on-save="onSave"/>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="close" text>Cancel</v-btn>
        <v-btn color="success" :disabled="invalid" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import UserRoleForm from './shared/UserRoleForm'

  export default {
    name: 'UserRoleDialog',
    components: { UserRoleForm },
    props: {
      item: {
        type: Object,
        default: undefined
      },
      onSave: {
        type: Function,
        required: true
      },
      onClose: {
        type: Function,
        required: true
      }
    },
    data: function () {
      return {
        invalid: false,
        user: undefined
      }
    },
    computed: {
      visible () {
        return !!this.user
      }
    },
    watch: {
      item: function () {
        this.updateUser()
      }
    },
    created () {
      this.updateUser()
    },
    methods: {
      updateUser () {
        this.user = this.item
      },
      save () {
        this.$refs.userRoleForm.save()
      },
      close () {
        this.onClose()
      }
    }
  }
</script>

<style scoped>

</style>
