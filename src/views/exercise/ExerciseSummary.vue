<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <div class="text-h5">
        <v-badge
          :content="languages"
          color="grey">
          {{exercise.title}}
        </v-badge>
      </div>
    </v-col>
    <v-col cols="12">
      <v-sheet
        class="pa-4"
        shaped>
        <v-subheader>Text</v-subheader>
        <blockquote class="blockquote"> {{text}}</blockquote>
        <v-subheader>Categories</v-subheader>
        <v-tooltip :key="tag.id" v-for="tag in exercise.tags" top>
          <template #activator="{on}">
            <v-chip color="primary" v-on="on" class="ma-1" outlined>
              {{ tag.title }}
            </v-chip>
          </template>
          {{ tag.title }}
        </v-tooltip>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'ExerciseSummary',
    props: {
      exercise: {
        type: Object,
        required: true
      },
      steps: {
        type: Array,
        required: true
      }
    },
    computed: {
      text () {
        return this.steps
          .map(s => s.text)
          .join(' ')
      },
      languages () {
        return this.exercise.from.code + ' → ' + this.exercise.to.code
      }
    }
  }
</script>

<style scoped>

</style>
