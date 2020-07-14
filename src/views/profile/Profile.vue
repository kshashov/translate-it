<template>
  <v-col cols="12" sm="7" class="pa-0">
    <profile-form
      ref="profileForm"
      :item="user"
      :on-save="onSave"
      :invalid.sync="invalid"/>
    <v-btn
      :disabled="invalid"
      color="success"
      @click="save">
      Save
    </v-btn>
  </v-col>
</template>

<script>
  import { Alert, resolve } from '../../utils/Utils'
  import { API_USER } from '../../constants/paths'
  import ProfileForm from './ProfileForm'

  export default {
    name: 'Profile',
    components: { ProfileForm },
    data: () => ({
      invalid: false,
      user: undefined
    }),
    beforeMount () {
      this.user = this.$store.state.user.info
    },
    methods: {
      save () {
        this.$refs.profileForm.save()
      },
      onSave (user) {
        this.$http({
          method: 'POST',
          url: resolve(API_USER, { userId: user.id }),
          data: {
            name: user.name
          }
        }).then(response => {
          Alert.success('User profile has been updated')
          this.$store.dispatch('init')
        })
      }
    }
  }
</script>

<style scoped>

</style>
