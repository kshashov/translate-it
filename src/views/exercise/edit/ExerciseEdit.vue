<template>
  <fragment>
    <v-breadcrumbs
      :items="links"
      exact
      large
    />
    <div v-if="!loading">
      <v-col
        cols="12"
        sm="8"
        md="6">
        <exercise-edit-form
          :item="exercise"
          :on-save="() => {}"/>
      </v-col>
      <v-col
        cols="12">
        <steps-edit-form
          :item="steps"
          :on-save="() => {}"/>
      </v-col>
    </div>
  </fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import AppBarMixin from '../../../mixins/AppBarMixin'
  import { resolve } from '../../../utils/Utils'
  import { API_EXERCISE, API_EXERCISE_STEPS } from '../../../constants/paths'
  import ExerciseEditForm from './ExerciseEditForm'
  import StepsEditForm from './StepsEditForm'

  export default {
    name: 'ExerciseEdit',
    mixins: [AppBarMixin],
    props: {
      id: {
        type: [Number, String],
        required: true
      }
    },
    data () {
      return {
        tab: 0,
        exercise: undefined,
        steps: undefined,
        links: [
          {
            text: 'Home',
            to: { name: 'Home' },
            exact: true
          },
          {
            text: 'Exercise',
            to: { name: 'Exercise' },
            exact: true
          },
          {
            text: 'Edit',
            to: { name: 'ExerciseEdit' },
            exact: true
          }
        ]
      }
    },
    created () {
      this.startLoading()
    },
    mounted () {
      const self = this

      const exercisesLoading = this.$http
        .get(resolve(API_EXERCISE, { exerciseId: this.id }))
        .then(exercise => {
          self.links[1].text = exercise.title
          self.setTitle(exercise.title)
          self.exercise = exercise
        })

      const stepsLoading = this.$http
        .get(resolve(API_EXERCISE_STEPS, { exerciseId: this.id }))
        .then((steps) => {
          self.steps = steps
        })

      Promise.all([exercisesLoading, stepsLoading])
        .finally(() => self.stopLoading())
    },
    components: {
      StepsEditForm,
      ExerciseEditForm,
      Fragment
    }
  }
</script>

<style scoped>
  div .v-tabs-items {
    background-color: transparent !important;
  }
</style>
