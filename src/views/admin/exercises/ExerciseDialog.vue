<template>
  <v-dialog v-model="visible" v-if="visible" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="$v.exercise.title.$model"
                :error-messages="titleErrors"
                label="Title"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                v-model="$v.exercise.tags.$model"
                :items="tags"
                :error-messages="tagsErrors"
                label="Tags"
                :loading="!tags"
                item-text="title"
                return-object
                clearable
                small-chips
                deletable-chips
                multiple>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="$v.exercise.from.$model"
                :items="langs"
                :error-messages="fromErrors"
                label="From"
                :loading="!langs"
                item-text="title"
                return-object
                clearable>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="$v.exercise.to.$model"
                :items="langs"
                :error-messages="toErrors"
                label="To"
                :loading="!langs"
                item-text="title"
                return-object
                clearable>
              </v-select>
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
  import { validationMixin } from 'vuelidate'
  import { required, minLength } from 'vuelidate/lib/validators'
  import lodash from 'lodash'
  import LangsMixin from '../../../mixins/LangsMixin'
  import TagsMixin from '../../../mixins/TagsMixin'

  export default {
    name: 'ExerciseDialog',
    mixins: [validationMixin, LangsMixin, TagsMixin],
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
        title: '',
        exercise: undefined
      }
    },
    validations: {
      exercise: {
        title: {
          required,
          minLength: minLength(3)
        },
        from: {
          required
        },
        to: {
          required
        },
        tags: {
          required
        }
      }
    },
    computed: {
      visible () {
        return !!this.exercise
      },
      titleErrors () {
        const errors = []
        !this.$v.exercise.title.required && errors.push('Title is required')
        !this.$v.exercise.title.minLength && errors.push('Title must have at least 3 letters')
        return errors
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
        this.exercise = this.item
          ? lodash.cloneDeep(this.item)
          : undefined

        if (this.exercise) {
          this.title = this.exercise.id
            ? 'Edit Exercise'
            : 'Create Exercise'
        }
      }
    },
    methods: {
      save () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          const exercise = {
            ...this.exercise,
            creator: lodash.get(this.exercise, 'creator.id'),
            from: lodash.get(this.exercise, 'from.id'),
            to: lodash.get(this.exercise, 'to.id'),
            tags: lodash.get(this.exercise, 'tags', []).map((tag) => tag.id)
          }

          this.onSave(exercise)
        }
      },
      close () {
        this.onClose()
      }
    }
  }
</script>
