<template>
  <fragment>
    <v-breadcrumbs
      :items="links"
      exact
      large
    />
    <div v-if="!loading">
      <exercise-edit-form
        :item="exercise"
        :on-save="onSaveExercise"/>
      <div class="py-4"></div>
      <steps-edit-form
        :item="steps"
        :on-save="onSaveSteps"/>
    </div>
  </fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import AppBarMixin from '../../../mixins/AppBarMixin'
  import { Alert, resolve } from '../../../utils/Utils'
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
      const exercisesLoading = this.$http
        .get(resolve(API_EXERCISE, { exerciseId: this.id }))
        .then(exercise => {
          this.links[1].text = exercise.title
          this.setTitle(exercise.title)
          this.exercise = exercise
        })

      const stepsLoading = this.$http
        .get(resolve(API_EXERCISE_STEPS, { exerciseId: this.id }))
        .then((steps) => {
          this.steps = steps
        })

      Promise.all([exercisesLoading, stepsLoading])
        .finally(() => this.stopLoading())
    },
    methods: {
      onSaveExercise (exercise) {
        this.$http({
          url: resolve(API_EXERCISE, { exerciseId: exercise.id }),
          method: 'PUT',
          data: JSON.stringify(exercise)
        }).then((result) => {
          Alert.success('Exercise has been updated')
        })
      },
      onSaveSteps (steps) {
        this.$http({
          url: resolve(API_EXERCISE_STEPS, { exerciseId: this.exercise.id }),
          method: 'POST',
          data: JSON.stringify(steps)
        }).then((result) => {
          Alert.success('Steps have been updated')
        })
      }
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
