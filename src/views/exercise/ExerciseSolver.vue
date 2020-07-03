<template>
  <fragment>
    <div class="text-center text-h6 my-4 text-overline"><v-chip color="accent" outlined>Your score: {{score}} / {{steps.length}}</v-chip></div>

    <v-stepper v-model="position" vertical>
      <template v-for="(item, index) in steps">

        <v-stepper-step
          :editable="true"
          :key="'title'+item.id"
          :step="index+1">
          <span class="text-body-1 mb-1">{{item.text}}</span>
          <span v-if="hasAnswers(item.id) && (position !== (index + 1))" class="text-h5">
          <UserAnswerText :answer="getLastAnswer(item.id)"/>
        </span>
        </v-stepper-step>

        <v-stepper-content
          :key="'content'+item.id"
          :step="index+1">
          <div class="pa-2 mb-2 d-flex">
            <UserAnswersList :answers="answers[item.id]"/>
            <v-spacer/>
            <AnswersList :answers="item.answers"/>
          </div>
          <div class="pb-2">
            <template v-if="forceEditMode || !hasAnswers(item.id)">
              <WordsList :words="item.words" class="ma-2"/>
              <v-textarea v-model.trim="$v.answer.$model" rows="1" class="mb-2" auto-grow hide-details outlined/>
              <v-btn
                color="primary"
                :disabled="$v.answer.$invalid"
                @click="submitAnswer(item.id, answer)">Submit
              </v-btn>
            </template>
            <div v-else class="text-center mb-2">
              <div>
                <UserAnswer :answers="item.answers" :answer="getLastAnswer(item.id)"/>
              </div>
              <v-btn @click="openSubmitForm(getLastAnswer(item.id))" color="primary">Try again</v-btn>
            </div>
          </div>
        </v-stepper-content>
      </template>
    </v-stepper>
  </fragment>
</template>

<script>
  import lodash from 'lodash'
  import AnswersList from './AnswersList'
  import WordsList from './WordsList'
  import UserAnswersList from './UserAnswersList'
  import UserAnswerText from './UserAnswerText'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import UserAnswer from './UserAnswer'
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'ExerciseSolver',
    mixins: [validationMixin],
    props: {
      exercise: {
        type: Object,
        required: true
      },
      steps: {
        type: Array,
        required: true
      },
      answers: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        position: 1,
        forceEditMode: false,
        answer: ''
      }
    },
    validations: {
      answer: {
        required
      }
    },
    watch: {
      position () {
        this.forceEditMode = false
        this.answer = ''
      }
    },
    computed: {
      score () {
        if (!this.answers) {
          return 0
        }
        return Object.entries(this.answers)
          .filter(a => lodash.get(lodash.last(a[1]), 'success', false)) //
          .length
      }
    },
    methods: {
      submitAnswer (stepId, answer) {
        // Remove double spaces
        answer = answer.replace(/  +/g, ' ')
        const result = {
          text: answer,
          success: true
        }

        // Save result and close form
        this.answers[stepId].push(result)
        this.closeSubmitForm()
      },
      openSubmitForm (answer) {
        this.answer = answer.text
        this.forceEditMode = true
      },
      closeSubmitForm () {
        this.forceEditMode = false
      },
      getLastAnswer (stepId) {
        return lodash.last(this.answers[stepId])
      },
      hasAnswers (stepId) {
        return this.answers[stepId].length !== 0
      }
    },
    components: {
      UserAnswer,
      UserAnswerText,
      AnswersList,
      WordsList,
      UserAnswersList,
      Fragment
    }
  }
</script>

<style scoped>
  .v-stepper {
    background: #00ffff00;
    border: 0;
    box-shadow: none
  }
</style>
