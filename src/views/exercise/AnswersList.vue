<template>
  <v-menu
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <a v-bind="attrs" v-on="on" style="color: grey; border-bottom: 1px dashed;">
        Answers
      </a>
    </template>

    <v-card>
      <v-card-text>
        <div :key="index" v-for="(answer, index) in answers" class="ma-2">
          {{answer.text}}
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    name: 'AnswersList',
    props: {
      answers: {
        type: Array,
        required: true
      }
    },
    components: {}
  }
</script>

<style scoped>

</style>
