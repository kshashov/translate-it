<template>
  <v-dialog v-model="visible" v-if="visible" max-width="1000px" :fullscreen="$vuetify.breakpoint.xsOnly" persistent>
    <v-card>
      <v-card-title>
        <v-input
          :error-messages="stepsErrors()"
          :hide-details="stepsErrors().length === 0"
        >
          <span class="headline">Edit Steps</span>
        </v-input>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-btn @click="add(0)" color="success" text>
                Add step
              </v-btn>
            </v-col>
          </v-row>
          <v-row :key="index" v-for="(step, index) in $v.steps.$each.$iter">
            <v-col cols="12">
              <v-card outlined>
                <v-card-title>
                  Step #{{parseInt(index)+1}}
                  <v-spacer></v-spacer>
                  <v-btn @click="() => {steps.splice(index, 1)}" icon small>
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model.trim="step.text.$model"
                    :error-messages="textErrors(step)"
                    label="Text"
                  ></v-text-field>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card>
                        <v-card-title inset>
                          <v-input
                            :error-messages="answersErrors(step)"
                            :hide-details="answersErrors(step).length === 0"
                          >
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
                              <v-text-field
                                v-model.trim="answer.text.$model"
                                :error-messages="answerTextErrors(answer)"
                                :label="'Answer #'+(parseInt(answerIndex) + 1)"
                              ></v-text-field>
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
                    <v-col cols="12" md="6">
                      <v-card>
                        <v-card-title inset>
                          <span class="title">Words</span>
                          <v-spacer></v-spacer>
                          <v-btn @click="step.words.$model.push({source:'', translation: ''})" color="success" icon>
                            <v-icon>mdi-plus-circle-outline</v-icon>
                          </v-btn>
                        </v-card-title>
                        <v-list>
                          <v-list-item :key="wordIndex" v-for="(word, wordIndex) in step.words.$each.$iter">
                            <v-list-item-title>
                              <v-row>
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                    v-model.trim="word.source.$model"
                                    :error-messages="wordSourceErrors(word)"
                                    :label="'Word #'+(parseInt(wordIndex) + 1)"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-text-field
                                    v-model.trim="word.translation.$model"
                                    :error-messages="wordTranslationErrors(word)"
                                    :label="'Translation #'+(parseInt(wordIndex) + 1)"
                                  ></v-text-field>
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
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-btn @click="add(index + 1)" color="success" text>
                Add step
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="close" text>Cancel</v-btn>
        <v-btn color="success" :disabled="$v.$invalid" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  // import Vue from 'vue'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import lodash from 'lodash'

  export default {
    name: 'StepsDialog',
    mixins: [validationMixin],
    props: {
      item: {
        type: Object,
        default: undefined
      },
      onSave: {
        type: Function,
        required: true
      },
      onClose: {
        type: Function,
        required: true
      }
    },
    data: function () {
      return {
        exerciseId: undefined,
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
    computed: {
      visible () {
        return !!this.steps
      },
      fromErrors () {
        const errors = []
        !this.$v.exercise.from.required && errors.push('From Lang is required')
        return errors
      },
      toErrors () {
        const errors = []
        !this.$v.exercise.to.required && errors.push('To Lang is required')
        return errors
      },
      tagsErrors () {
        const errors = []
        !this.$v.exercise.tags.required && errors.push('Tags is required')
        return errors
      }
    },
    watch: {
      item: function () {
        this.exerciseId = this.item
          ? this.item.exerciseId
          : undefined

        this.steps = this.item
          ? lodash.cloneDeep(this.item.steps)
          : undefined
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
          this.onSave(this.exerciseId, this.steps)
        }
      },
      close () {
        this.onClose()
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
    }
  }
</script>
