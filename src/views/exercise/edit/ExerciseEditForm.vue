<template>
  <fragment>
    {{dirty}}

    <exercise-form
      :invalid.sync="invalid"
      :dirty.sync="dirty"
      ref="exerciseForm"
      :item="exercise"
      :on-save="onSave"/>
    <v-btn
      :disabled="invalid"
      @click="save"
      color="success">
      Save
    </v-btn>
  </fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import ExerciseForm from '../../admin/exercises/shared/ExerciseForm'

  export default {
    name: 'ExerciseEditForm',
    props: {
      item: {
        type: Object,
        default: undefined
      },
      onSave: {
        type: Function,
        required: true
      }
    },
    data: function () {
      return {
        dirty: false,
        invalid: true,
        exercise: undefined
      }
    },
    computed: {
      visible () {
        return !!this.exercise
      }
    },
    watch: {
      item: function () {
        console.log(this.item)
        this.updateExercise()
      }
    },
    created () {
      this.updateExercise()
    },
    methods: {
      updateExercise () {
        this.exercise = this.item
      },
      save () {
        console.log(this.$refs.exerciseForm.$v.$invalid)
        this.$refs.exerciseForm.save()
      }
    },
    components: {
      Fragment,
      ExerciseForm
    }
  }
</script>
