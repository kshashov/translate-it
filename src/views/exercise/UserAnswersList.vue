<template>
  <v-menu
    :close-on-content-click="false"
    :nudge-width="200"
    v-if="answers.length"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <a v-bind="attrs" v-on="on" style="border-bottom: 1px dashed">
        Your answers
      </a>
    </template>

    <v-card>
      <v-card-text>
        <div :key="index" v-for="(answer, index) in answersHistory" class="ma-2">
          <UserAnswerText :answer="answer"/>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
  import UserAnswerText from './UserAnswerText'
  export default {
    name: 'UserAnswersList',
    props: {
      answers: {
        type: Array,
        required: true
      }
    },
    computed: {
      answersHistory () {
        return this.answers
      }
    },
    methods: {
      getAnswerColor (answer) {
        return answer.success
          ? 'greeb'
          : 'red'
      }
    },
    components: { UserAnswerText }
  }
</script>

<style scoped>

</style>
