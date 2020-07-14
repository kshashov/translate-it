<template>
  <v-container class="text-center" fill-height fluid>
    <v-row align="center">
      <v-col>
        <p class="display-2 primary--text">{{title}}</p>
        <p v-if="text">{{text}}</p>
        <slot name="actions">
          <v-btn
            to="/"
            color="primary"
            outlined
          >
            Get me out of here!
          </v-btn>
        </slot>
        <slot name="footer">
        </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ErrorPage',
    props: {
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        default: ''
      },
      status: {
        type: Number,
        required: true
      }
    },
    created () {
      this.$ssrContext && this.$ssrContext.res.status(this.props.status)
    }
  }
</script>

<style scoped>

</style>
