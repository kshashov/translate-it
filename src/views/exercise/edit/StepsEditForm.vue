<template>
  <fragment>
    <steps-form
      ref="stepsForm"
      :item="steps"
      :on-save="onSave"
      :invalid.sync="invalid"
    />

    <v-btn color="success" :disabled="invalid" @click="save">Save</v-btn>
  </fragment>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { Fragment } from 'vue-fragment'
  import StepsForm from './shared/StepsForm'

  export default {
    name: 'StepsEditForm',
    mixins: [validationMixin],
    props: {
      item: {
        type: Array,
        default: undefined
      },
      onSave: {
        type: Function,
        required: true
      }
    },
    data: function () {
      return {
        invalid: false,
        steps: undefined
      }
    },
    watch: {
      item: function () {
        this.updateData()
      }
    },
    created () {
      this.updateData()
    },
    methods: {
      updateData () {
        this.steps = this.item
      },
      save () {
        this.$refs.stepsForm.save()
      }
    },
    components: {
      StepsForm,
      Fragment
    }
  }
</script>
