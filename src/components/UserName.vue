<template>
  <span>
    <slot v-bind:item="user">
    <v-badge
      v-if="sameUser"
      content="You"
      color="grey"
      top>
      {{user.name}}
    </v-badge>
    </slot>
  </span>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    computed: {
      sameUser () {
        return this.$store.state.user && (this.user.id === this.$store.state.user.info.id)
      }
    },
    name: 'UserName'
  }
</script>

<style scoped>

</style>
