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
                v-model="exercise.title"
                :error-messages="titleErrors"
                label="Title"
                @input="$v.exercise.title.$touch()"
                @blur="$v.exercise.title.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                v-model="exercise.tags"
                :items="tagItems"
                :error-messages="tagsErrors"
                label="Tags"
                :loading="!tagItems"
                item-text="title"
                return-object
                clearable
                small-chips
                deletable-chips
                multiple
                @change="$v.exercise.tags.$touch()"
                @blur="$v.exercise.tags.$touch()">
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="exercise.from"
                :items="langItems"
                :error-messages="fromErrors"
                label="From"
                :loading="!langItems"
                item-text="title"
                return-object
                clearable
                @change="$v.exercise.from.$touch()"
                @blur="$v.exercise.from.$touch()">
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="exercise.to"
                :items="langItems"
                :error-messages="toErrors"
                label="To"
                :loading="!langItems"
                item-text="title"
                return-object
                clearable
                @change="$v.exercise.to.$touch()"
                @blur="$v.exercise.to.$touch()">
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
  import Vue from 'vue'
  import { validationMixin } from 'vuelidate'
  import { required, minLength } from 'vuelidate/lib/validators'

  export default {
    name: 'ExerciseDialog',
    mixins: [validationMixin],
    props: {
      item: {
        type: Object,
        default: undefined
      },
      langs: {
        type: Array
      },
      tags: {
        type: Array
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
      langItems () {
        return this.$props.langs
      },
      tagItems () {
        return this.$props.tags
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
          ? Vue.util.extend({}, this.item)
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
            creator: this.exercise.creator && this.exercise.creator.id,
            from: this.exercise.from && this.exercise.from.id,
            to: this.exercise.to && this.exercise.to.id,
            tags: this.exercise.tags && this.exercise.tags.map((tag) => tag.id)
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

<style scoped>

</style>
