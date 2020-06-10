<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld.vue'
  import { getCurrentUser } from '../utils/APIUtils'

  export default {
    name: 'Home',
    beforeMount () {
      getCurrentUser()
    },
    components: {
      HelloWorld
    }
  }
</script>
