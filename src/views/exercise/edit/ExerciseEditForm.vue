<template>
  <fragment>
<!--    <v-alert v-if="dirty" type="info">-->
<!--      You have unsaved changes.-->
<!--    </v-alert>-->
    <v-row>
      <v-col
        cols="12"
        sm="7">
        <v-card elevation="0">
          <v-card-text>
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
              Save Summary
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
