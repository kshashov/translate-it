export default {
  watch: {
    '$v.$invalid': function () {
      this.$emit('update:invalid', this.$v.$invalid)
    },
    '$v.$anyDirty': function () {
      this.$emit('update:dirty', this.$v.$anyDirty)
    }
  },
  created () {
    this.$emit('update:invalid', this.$v.$invalid)
    this.$emit('update:dirty', this.$v.$anyDirty)
  }
}
