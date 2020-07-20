<template>
  <v-card v-if="!!exercise" elevation="0">
    <v-card-subtitle>
      <v-row class="ma-0">
        <v-col class="pa-0">
          <span class="text-overline">
            {{exercise.from.code}} → {{exercise.to.code}}
          </span>
        </v-col>
        <v-spacer/>
        <v-col v-if="exercise.userScore" class="pa-0 d-flex justify-end align-center">
          <v-chip
            v-if="exercise.userScore === exercise.stepsTotal"
            color="accent"
            outlined
            small>
            Completed
          </v-chip>
          <v-progress-circular
            v-else
            :rotate="270"
            :size="25"
            :width="5"
            :value="100*exercise.userScore/exercise.stepsTotal"
            color="primary"
          />
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-title class="py-0">
      <a>
        <router-link class="text-decoration-none" :to="{name: 'Exercise', params: { id: exercise.id }}">
          {{exercise.title}}
        </router-link>
      </a>
    </v-card-title>
    <v-card-text class="py-0">
      {{ exercise.stepsTotal }} Steps
    </v-card-text>
    <v-card-text>
      <v-chip :key="tag.id" v-for="tag in exercise.tags" class="ma-1" small>
        {{tag.title}}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>

  export default {
    name: 'ExerciseCard',
    props: {
      exercise: {
        type: Object,
        required: true
      }
    },
    methods: {
      open () {
        this.$router.push({
          name: 'Exercise',
          params: { id: this.exercise.id }
        })
      }
    }
  }
</script>

<style scoped>

</style>
