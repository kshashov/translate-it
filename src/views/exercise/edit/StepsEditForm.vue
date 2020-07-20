<template>
  <fragment>
    <!--    <v-alert v-if="dirty" type="info">-->
    <!--      You have unsaved changes.-->
    <!--    </v-alert>-->
    <v-btn
      :disabled="invalid"
      @click="save"
      color="success">
      Save Steps
    </v-btn>

    <steps-form
      ref="stepsForm"
      :item="item"
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
        dirty: false
      }
    },
    methods: {
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
