<template>
  <error-page
    :status="404"
    title="Whoops, 404"
    text="The page you were looking for does not exist"
  >
  </error-page>
</template>

<script>
  import ErrorPage from './ErrorPage'

  export default {
    name: 'NotFound',
    components: {
      ErrorPage
    }
  }
</script>

<style scoped>

</style>
