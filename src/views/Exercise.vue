<template>
  <fragment>
    <v-breadcrumbs
      :items="links"
      exact
      large
    />
    <h2 v-if="!!exercise"> {{exercise.title}} </h2>
  </fragment>
</template>

<script>

  import AppBarMixin from '../mixins/AppBarMixin'
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'Exercise',
    mixins: [AppBarMixin],
    props: {
      id: {
        type: [Number, String],
        required: true
      }
    },
    data () {
      return {
        exercise: undefined,
        links: [
          {
            text: 'Home',
            to: { name: 'Home' },
            disabled: false,
            exact: true
          },
          {
            text: 'Exercise',
            disabled: true
          }
        ]
      }
    },
    mounted () {
      const self = this
      this.$http.get('/api/exercises/' + this.id)
        .then(exercise => {
          self.setTitle(exercise.title)
          self.exercise = exercise
        })
    },
    methods: {},
    components: { Fragment }
  }
</script>
