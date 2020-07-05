<template>
  <fragment>
    <div class="text-center text-h6 my-4 text-overline">
      <v-chip color="accent" outlined>Your score: {{score}} / {{steps.length}}</v-chip>
    </div>

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
            <transition name="component-fade" mode="out-in">
              <div v-if="forceEditMode || !hasAnswers(item.id)" key="tr1">
                <WordsList :words="item.words" class="ma-2"/>
                <v-textarea v-model.trim="$v.answer.$model" rows="1" class="mb-2" auto-grow hide-details outlined/>
                <v-btn
                  color="primary"
                  :disabled="$v.answer.$invalid"
                  @click="submitAnswer(item.id, answer)">Submit
                </v-btn>
              </div>
              <div v-else class="text-center mb-2" key="tr2">
                <div>
                  <UserAnswer :sources="answersWords[index]" :answer="getLastAnswer(item.id)"/>
                </div>
                <v-btn @click="openSubmitForm(getLastAnswer(item.id))" color="primary">Try again</v-btn>
              </div>
            </transition>
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
  import { API_USER_ANSWERS } from '../../constants/paths'

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
        // Wher step is selected
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
          .filter(a => lodash.get(lodash.last(a[1]), 'success', false))
          .length
      },
      answersWords () {
        if (!this.exercise) {
          return []
        }

        return this.steps
          .map(s => s.answers.map(a => a.text.split(' ')))
      }
    },
    methods: {
      submitAnswer (stepId, answer) {
        this.$http.post(API_USER_ANSWERS, {
          userId: this.$store.state.user.info.id,
          stepId: stepId,
          text: answer
        }).then(result => {
          // Save result locally and close form
          this.answers[stepId].push(result)
          this.closeSubmitForm()
        })
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

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }

  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active до версии 2.1.8 */
  {
    opacity: 0;
  }
</style>
