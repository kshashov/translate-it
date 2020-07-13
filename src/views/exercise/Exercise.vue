<template>
  <fragment>
    <v-breadcrumbs
      :items="links"
      exact
      large
    />
    <div v-if="!loading" class="mx-4">
      <ExerciseSummary
        :exercise="exercise"
        :steps="steps"/>
      <v-row v-if="!canSolveExercise">
        <v-col cols="12" class="text-center pa-4">
          <div class="text-uppercase text-subtitle-1 py-4">Words</div>
          <div
            :key="word.id"
            v-for="word in words"
            class="text-subtitle-1">
            <span class="font-weight-bold">{{word.source}}</span>
            &ndash;
            {{word.translation}}
          </div>
        </v-col>
        <v-col
          cols="12"
          class="text-center">
          <v-btn
            v-if="!authenticated"
            @click="setShowLogin(true)"
            color="primary"
            large
          >Login
          </v-btn>
          <p v-else class="subtitle-1">
            You have no access to solve exercises
          </p>
        </v-col>
      </v-row>
      <ExerciseSolver
        v-else
        :exercise="exercise"
        :steps="steps"
        :answers="answers"
      />
    </div>
  </fragment>
</template>

<script>

  import AppBarMixin from '../../mixins/AppBarMixin'
  import { Fragment } from 'vue-fragment'
  import ExerciseSummary from './ExerciseSummary'
  import { mapGetters, mapMutations } from 'vuex'
  import ExerciseSolver from './ExerciseSolver'
  import { API_EXERCISE, API_EXERCISE_STEPS, API_USER_ANSWERS } from '../../constants/paths'
  import { resolve } from '../../utils/Utils'

  export default {
    name: 'Exercise',
    mixins: [AppBarMixin],
    props: {
      id: {
        type: [Number, String],
        required: true
      }
    },
    data () {
      return {
        exercise: undefined,
        steps: undefined,
        answers: undefined,
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
          }
        ]
      }
    },
    computed: {
      words () {
        if (!this.steps) {
          return []
        }

        return this.steps
          .flatMap(s => s.words)
      },
      canSolveExercise () {
        return this.$can('solve', 'Exercise')
      },
      ...mapGetters(['authenticated'])
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

      let answersLoading = Promise.resolve()
      if (this.$store.getters.authenticated) {
        answersLoading = this.$http
          .get(API_USER_ANSWERS, {
            params: {
              exerciseId: this.id,
              userId: this.$store.state.user.info.id
            }
          }).then((answers) => {
            this.answers = answers
          })
      }

      Promise.all([exercisesLoading, stepsLoading, answersLoading])
        .then(() => {
          if (this.answers) {
            // Add empty answer arrays for missing steps
            for (let i = 0; i < this.steps.length; i++) {
              const stepId = this.steps[i].id
              if (!this.answers[stepId]) {
                this.$set(this.answers, stepId + '', [])
              }
            }
          }
        }).finally(() => this.stopLoading())
    },
    methods: {
      ...mapMutations(['setShowLogin'])
    },
    components: {
      ExerciseSolver,
      ExerciseSummary,
      Fragment
    }
  }
</script>
