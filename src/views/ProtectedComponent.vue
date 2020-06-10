<template>
  <forbidden v-if="!hasAccess"/>
  <div class="fill-height" v-else>
    <slot></slot>
  </div>
</template>

<script>
  import Forbidden from './Forbidden'
  import { hasRoutePermissions } from '../utils/Utils'

  export default {
    name: 'ProtectedComponent',
    data: function () {
      return {}
    },
    computed: {
      hasAccess () {
        return hasRoutePermissions(
          this.$store.state.user,
          this.$router.currentRoute)
      }
    },
    components: {
      Forbidden
    }
  }
</script>

<style scoped>

</style>
