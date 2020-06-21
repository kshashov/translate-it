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
                v-model="$v.user.role.$model"
                :items="roleItems"
                :error-messages="roleErrors"
                label="Role"
                :loading="!roleItems"
                item-text="title"
                return-object
                clearable>
              </v-select>

            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="close" text>Cancel</v-btn>
        <v-btn color="success" :disabled="$v.$invalid" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import lodash from 'lodash'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'UserRoleDialog',
    mixins: [validationMixin],
    props: {
      item: {
        type: Object,
        default: undefined
      },
      roles: {
        type: Array
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
        user: undefined
      }
    },
    validations: {
      user: {
        role: {
          required
        }
      }
    },
    computed: {
      visible () {
        return !!this.user
      },
      roleItems () {
        return this.$props.roles
      },
      roleErrors () {
        const errors = []
        !this.$v.user.role.required && errors.push('Role is required')
        return errors
      }
    },
    watch: {
      item: function () {
        this.user = this.item
          ? lodash.cloneDeep(this.item)
          : undefined
      }
    },
    methods: {
      save () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.onSave(this.user)
        }
      },
      close () {
        this.onClose()
      }
    }
  }
</script>

<style scoped>

</style>
