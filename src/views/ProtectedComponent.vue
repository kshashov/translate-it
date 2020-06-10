<template>
  <forbidden v-if="!hasAccess"/>
  <div v-else class="fill-height">
    <slot></slot>
  </div>
</template>

<script>
  import Forbidden from './Forbidden'
  import { mapState } from 'vuex'

  export default {
    name: 'ProtectedComponent',
    data: function () {
      return {}
    },
    computed: {
      ...mapState(['hasAccess'])
    },
    components: {
      Forbidden
    }
  }
</script>

<style scoped>

</style>
