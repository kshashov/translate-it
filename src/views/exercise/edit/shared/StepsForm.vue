<template>
  <fragment>
    <v-row>
      <v-col cols="12">
        <v-input
          :error-messages="stepsErrors()"
          :hide-details="stepsErrors().length === 0">
          <v-btn @click="add(0)" color="success" text>
            Add step
          </v-btn>
        </v-input>
      </v-col>
    </v-row>
    <v-row :key="index" v-for="(step, index) in $v.steps.$each.$iter">
      <v-col cols="12" md="7">
        <v-card elevation="0">
          <v-card-title>
            Step #{{parseInt(index)+1}}
            <v-spacer></v-spacer>
            <v-btn @click="() => {steps.splice(index, 1)}" icon small>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model.trim="step.text.$model"
              :error-messages="textErrors(step)"
              label="Text"
              rows="1"
              auto-grow/>
            <v-row>
              <v-col cols="12" class="pa-1">
                <v-card outlined>
                  <v-card-title inset>
                    <v-input
                      :error-messages="answersErrors(step)"
                      :hide-details="answersErrors(step).length === 0">
                      <span class="title">Answers</span>
                    </v-input>
                    <v-spacer></v-spacer>
                    <v-btn @click="step.answers.$model.push({text:''})" color="success" icon>
                      <v-icon>mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-list>
                    <v-list-item :key="answerIndex" v-for="(answer, answerIndex) in step.answers.$each.$iter">
                      <v-list-item-title>
                        <v-textarea
                          v-model.trim="answer.text.$model"
                          :error-messages="answerTextErrors(answer)"
                          :label="'Answer #'+(parseInt(answerIndex) + 1)"
                          rows="1"
                          auto-grow/>
                      </v-list-item-title>
                      <v-list-item-action>
                        <v-btn @click="() => {steps[index].answers.splice(answerIndex, 1)}" icon small>
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card class="transparent" outlined>
          <span class="overline">Words</span>
          <v-btn @click="step.words.$model.push({source:'', translation: ''})" color="success" icon>
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
          <v-list style="background-color: transparent">
            <v-list-item
              :key="wordIndex"
              v-for="(word, wordIndex) in step.words.$each.$iter"
              class="pa-0 ma-0"
              style="background-color: transparent">
              <v-list-item-title>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model.trim="word.source.$model"
                      :error-messages="wordSourceErrors(word)"
                      :label="'Word #'+(parseInt(wordIndex) + 1)"
                      dense/>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model.trim="word.translation.$model"
                      :error-messages="wordTranslationErrors(word)"
                      :label="'Translation #'+(parseInt(wordIndex) + 1)"
                      dense/>
                  </v-col>
                </v-row>
              </v-list-item-title>
              <v-list-item-action>
                <v-btn @click="() => {steps[index].words.splice(wordIndex, 1)}" icon small>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn @click="add(index + 1)" color="success" text>
          Add step
        </v-btn>
      </v-col>
    </v-row>
  </fragment>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import { Fragment } from 'vue-fragment'
  import cloneDeep from 'lodash/cloneDeep'
  import FormValidationMixin from '../../../../mixins/FormValidationMixin'

  export default {
    name: 'StepsForm',
    mixins: [validationMixin, FormValidationMixin],
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
        steps: undefined
      }
    },
    validations: {
      steps: {
        required,
        $each: {
          text: {
            required
          },
          answers: {
            required,
            $each: {
              text: {
                required
              }
            }
          },
          words: {
            $each: {
              source: {
                required
              },
              translation: {
                required
              }
            }
          }
        }
      }
    },
    watch: {
      item: {
        handler (item) {
          this.steps = item
            ? cloneDeep(item)
            : undefined
        },
        immediate: true
      }
    },
    methods: {
      add (index) {
        this.steps.splice(index, 0, {
          text: '',
          answers: [],
          words: []
        })
      },
      save () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.onSave(this.steps)
        }
      },
      stepsErrors () {
        const errors = []
        !this.$v.steps.required && errors.push('Steps list must not be empty')
        return errors
      },
      textErrors (step) {
        const errors = []
        !step.text.required && errors.push('Text is required')
        return errors
      },
      answersErrors (step) {
        const errors = []
        !step.answers.required && errors.push('Answer list must not be empty')
        return errors
      },
      answerTextErrors (answer) {
        const errors = []
        !answer.text.required && errors.push('Answer is required')
        return errors
      },
      wordSourceErrors (word) {
        const errors = []
        !word.source.required && errors.push('Word is required')
        return errors
      },
      wordTranslationErrors (word) {
        const errors = []
        !word.translation.required && errors.push('Translation is required')
        return errors
      }
    },
    components: { Fragment }
  }
</script>
