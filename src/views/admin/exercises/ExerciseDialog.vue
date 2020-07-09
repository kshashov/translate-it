<template>
  <v-dialog v-model="visible" v-if="visible" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Create Exercise</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <exercise-form
            ref="exerciseForm"
            :invalid.sync="invalid"
            :item="exercise"
            :on-save="this.onSave"/>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="close"
          color="secondary"
          text>
          Cancel
        </v-btn>
        <v-btn
          :disabled="invalid"
          @click="save"
          color="success">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import ExerciseForm from './shared/ExerciseForm'

  export default {
    name: 'ExerciseDialog',
    components: { ExerciseForm },
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
        this.$refs.exerciseForm.save()
      },
      close () {
        this.onClose()
      }
    }
  }
</script>
