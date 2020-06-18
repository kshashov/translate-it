<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout" top multi-line>
    {{message}}
    <v-btn color="white" @click.native="show = false" text>Close</v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        message: '',
        timeout: 30000,
        color: 'info'
      }
    },
    created: function () {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type !== 'snack/setSnack') {
          return
        }

        const text = state.snack.text
        const color = state.snack.type

        if (text !== '') {
          this.message = text
          this.color = color
          this.show = true
        }
      })
    },
    beforeDestroy () {
      this.unsubscribe()
    }
  }
</script>
