<template>
  <v-card v-if="!!exercise">
    <v-card-subtitle>
      {{exercise.from.code}} - {{exercise.from.code}}
    </v-card-subtitle>
    <v-card-title>
      <a>
        <router-link class="text-decoration-none" :to="{name: 'Exercise', params: { id: exercise.id }}">
          {{exercise.title}}
        </router-link>
      </a>
    </v-card-title>
    <v-card-text>
      <v-chip :key="tag.id" v-for="tag in exercise.tags" class="ma-1">
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
