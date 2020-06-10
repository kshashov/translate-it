<template>
  <error-page
    :status="403"
    title="Whoops, 403"
    text="You're not permitted to see this"
  >
  </error-page>
</template>

<script>
  import ErrorPage from './ErrorPage'

  export default {
    name: 'Forbidden',
    data: function () {
      return {
        from: this.$route.query.from
      }
    },
    components: {
      ErrorPage
    }
  }
</script>

<style scoped>

</style>
