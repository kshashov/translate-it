<template>
  <fragment>
    <v-text-field
      :value="user.email"
      label="Email"
      disabled
    ></v-text-field>
    <v-text-field
      v-model.trim="$v.user.name.$model"
      :error-messages="nameErrors"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      :value="user.role.title"
      label="Role"
      disabled
    ></v-text-field>
  </fragment>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength } from 'vuelidate/lib/validators'
  import { Fragment } from 'vue-fragment'
  import lodash from 'lodash'
  import FormValidationMixin from '../../mixins/FormValidationMixin'

  export default {
    name: 'ProfileForm',
    mixins: [validationMixin, FormValidationMixin],
    validations: {
      user: {
        name: {
          required,
          minLength: minLength(3)
        }
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      onSave: {
        type: Function,
        required: true
      }
    },
    data: () => ({
      user: undefined
    }),
    computed: {
      nameErrors () {
        const errors = []
        !this.$v.user.name.required && errors.push('Name is required.')
        !this.$v.user.name.minLength && errors.push('Name must have at least 3 letters')
        return errors
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
          ? lodash.cloneDeep(this.item)
          : undefined
      },
      save () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.onSave(this.user)
        }
      }
    },
    components: { Fragment }
  }
</script>

<style scoped>

</style>
