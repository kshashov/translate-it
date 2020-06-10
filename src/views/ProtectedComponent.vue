<template>
  <forbidden v-if="!hasAccess"/>
  <router-view v-else></router-view>
</template>

<script>
  import Forbidden from './Forbidden'
  import { hasPermissions } from '../utils/Utils'

  export default {
    name: 'ProtectedComponent',
    data: function () {
      return {}
    },
    computed: {
      hasAccess () {
        return hasPermissions(this.$store, this.$router)
      }
    },
    components: {
      Forbidden
    }
  }
</script>

<style scoped>

</style>
