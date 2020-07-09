<template>
  <v-col cols="12" sm="8" md="6">
    <v-text-field
      :value="email"
      label="Email"
      disabled
    ></v-text-field>
    <v-text-field
      v-model.trim="$v.name.$model"
      :error-messages="nameErrors"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      :value="role.title"
      label="Role"
      disabled
    ></v-text-field>
    <v-btn
      :disabled="$v.$invalid"
      color="success"
      @click="save">
      Save
    </v-btn>
  </v-col>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength } from 'vuelidate/lib/validators'
  import { Alert, resolve } from '../utils/Utils'
  import { API_USER } from '../constants/paths'

  export default {
    name: 'Profile',
    mixins: [validationMixin],

    validations: {
      name: {
        required,
        minLength: minLength(3)
      }
    },

    data: () => ({
      name: '',
      email: '',
      role: {
        title: '',
        description: ''
      }
    }),
    beforeMount () {
      this.name = this.$store.state.user.info.name
      this.email = this.$store.state.user.info.email
      this.role = this.$store.state.user.info.role
    },
    computed: {
      nameErrors () {
        const errors = []
        !this.$v.name.required && errors.push('Name is required.')
        !this.$v.name.minLength && errors.push('Name must have at least 3 letters')
        return errors
      }
    },
    methods: {
      save () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.$http({
            method: 'POST',
            url: resolve(API_USER, { userId: this.$store.state.user.info.id }),
            data: {
              name: this.name
            }
          }).then(response => {
            Alert.success('User profile has been updated')
            this.$store.dispatch('init')
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
