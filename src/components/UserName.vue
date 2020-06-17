<template>
  <span>
    <slot v-bind:item="user">
      {{user.name}}
    </slot>
    <v-chip
      v-if="sameUser"
      class="ml-1"
      x-small>
      You
    </v-chip>
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
