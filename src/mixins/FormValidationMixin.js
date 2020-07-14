export default {
  watch: {
    '$v.$invalid': {
      handler (value) {
        this.$emit('update:invalid', value)
      },
      immediate: true
    },
    '$v.$anyDirty': {
      handler (value) {
        this.$emit('update:dirty', value)
      },
      immediate: true
    }
  }
}
