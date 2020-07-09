<template>
  <fragment>
<!--    <v-alert v-if="dirty" type="info">-->
<!--      You have unsaved changes.-->
<!--    </v-alert>-->

    <steps-form
      ref="stepsForm"
      :item="steps"
      :on-save="onSave"
      :invalid.sync="invalid"
      :dirty.sync="dirty"
    />

    <v-btn
      :disabled="invalid"
      @click="save"
      color="success">
      Save Steps
    </v-btn>
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
        dirty: false,
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
