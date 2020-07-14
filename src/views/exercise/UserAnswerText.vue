<template>
    <span :style="style">
      {{ text }}
    </span>
</template>

<script>
  export default {
    name: 'UserAnswerText',
    props: {
      answer: {
        type: Object,
        required: true
      }
    },
    computed: {
      style () {
        return {
          color: this.answer.success ? 'green' : 'red'
        }
      },
      text () {
        return this.answer.text
      }
    }

  }
</script>

<style scoped>

</style>
