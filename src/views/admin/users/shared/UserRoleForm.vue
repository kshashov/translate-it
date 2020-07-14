<template>
  <v-row>
    <v-col cols="12" sm="6" md="6" class="py-0">
      <v-text-field v-model.trim="user.email" label="Email" disabled></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="6" class="py-0">
      <v-text-field v-model.trim="user.name" label="Name" disabled></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12" class="py-0">
      <v-select
        v-model="$v.user.role.$model"
        :items="roles"
        :error-messages="roleErrors"
        label="Role"
        :loading="!roles"
        item-text="title"
        return-object
        clearable>
      </v-select>

    </v-col>
  </v-row>
</template>

<script>
  import cloneDeep from 'lodash/cloneDeep'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import RolesMixin from '../../../../mixins/RolesMixin'
  import FormValidationMixin from '../../../../mixins/FormValidationMixin'

  export default {
    name: 'UserRoleForm',
    mixins: [validationMixin, RolesMixin, FormValidationMixin],
    props: {
      item: {
        type: Object,
        default: undefined
      },
      onSave: {
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
      roleErrors () {
        const errors = []
        !this.$v.user.role.required && errors.push('Role is required')
        return errors
      }
    },
    watch: {
      item: {
        handler (item) {
          this.user = item
            ? cloneDeep(item)
            : undefined
        },
        immediate: true
      }
    },
    methods: {
      save () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.onSave(this.user)
        }
      }
    }
  }
</script>

<style scoped>

</style>
