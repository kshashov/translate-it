<template>
  <v-dialog v-model="visible" v-if="visible" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Edit User</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="user.email" label="Email" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="user.name" label="Name" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                v-model="user.role"
                :items="roles"
                label="Role"
                :loading="!roles"
                item-text="title"
                return-object
                aria-required="true">
              </v-select>

            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="this.close" text>Cancel</v-btn>
        <v-btn color="success" @click="this.save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import Vue from 'vue'
  import { request } from '../../utils/APIUtils'

  export default {
    name: 'UserRoleDialog',
    props: {
      item: {
        type: Object,
        default: undefined
      },
      onSave: Function,
      onClose: Function
    },
    data: function () {
      return {
        user: undefined,
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
    computed: {
      visible () {
        return !!this.user
      }
    },
    watch: {
      item: function () {
        this.user = this.item
          ? Vue.util.extend({}, this.item)
          : undefined
      }
    },
    methods: {
      save () {
        this.onSave(this.user)
      },
      close () {
        this.onClose()
      }
    }
  }
</script>

<style scoped>

</style>
