<template>
  <div class="text-body-1">
    Useful words:
    <span :key="index" v-for="(answer, index) in words">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" class="font-weight-bold">{{answer.source}}</a>
          </template>

          <span class="font-weight-bold">{{answer.translation}}</span>
        </v-tooltip>
      <!-- hide for the last item -->
        <span v-if="index < words.length-1">, </span>
    </span>
  </div>
</template>

<script>

  export default {
    name: 'WordsList',
    props: {
      words: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
