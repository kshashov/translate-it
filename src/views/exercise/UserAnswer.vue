<template>
  <fragment>
    <div class="text-subtitle-1" v-if="!answer.success">There are <span class="word-fail">errors</span> in your
      translation:
    </div>
    <div class="text-h6 my-4">
      <span v-if="answer.success" class="word-success">{{answer.text}}</span>
      <span
        v-else
        :key="index"
        v-for="(word, index) in words"
        :class="[word.fail? 'word-fail' : 'word-success']">
          <span
            v-if="!!word.empty"
            class="pa-1 word-space">...</span>
          <span
            v-else
            class="py-1">
            {{ word.text  }}
          </span>
        </span>
    </div>
  </fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'UserAnswer',
    props: {
      answer: {
        type: Object,
        required: true
      },
      sources: {
        type: Array,
        required: true
      }
    },
    computed: {
      text () {
        return this.answer.text
      },
      words () {
        if (this.answer.success) {
          return undefined
        }

        const target = this.answer.text.split(' ')

        const result = []
        for (let i = 0; i < this.sources.length; i++) {
          let sourceStart = 0
          const source = this.sources[i]
          let wordsCoveredByEmpty = 0
          result[i] = []
          for (const w in target) {
            const word = target[w]
            let success = false
            for (let sourceW = sourceStart; sourceW < source.length; sourceW++) {
              if (word === source[sourceW]) {
                // add space before match
                if ((sourceW > sourceStart) && (sourceW > w + wordsCoveredByEmpty)) {
                  wordsCoveredByEmpty += sourceW - sourceStart - 1
                  result[i].push({
                    fail: true,
                    empty: true
                  })
                }

                // add success
                result[i].push({
                  text: word,
                  fail: false,
                  empty: false
                })

                sourceStart = sourceW + 1
                success = true
                break
              }
            }
            if (!success) {
              // add fail
              result[i].push({
                text: word,
                fail: true,
                empty: false
              })
            }
          }

          if ((result[i].length + wordsCoveredByEmpty) < source.length) {
            // add ending space
            result[i].push({
              fail: true,
              empty: true
            })
          }
        }

        console.log(result)
        return result[0]
      }
    },
    components: { Fragment }
  }
</script>

<style scoped>
  .word-success {
    color: green;
  }

  .word-fail {
    color: red;
  }

  .word-space {
    background-color: #FF000015
  }
</style>
