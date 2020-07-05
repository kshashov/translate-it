<template>
  <sign-in v-if="!hasAccess && !authenticated"/>
  <forbidden v-else-if="!hasAccess"/>
  <div v-else class="fill-height">
    <slot></slot>
  </div>
</template>

<script>
  import Forbidden from '../views/Forbidden'
  import { mapState } from 'vuex'
  import SignIn from '../views/SignIn'

  export default {
    name: 'ProtectedComponent',
    data: function () {
      return {}
    },
    computed: {
      ...mapState(['hasAccess', 'authenticated'])
    },
    components: {
      SignIn,
      Forbidden
    }
  }
</script>

<style scoped>

</style>
