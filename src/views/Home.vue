<template>
  <fragment>
    <v-row justify="start">
      <v-col cols="12">
        <v-row>
          <v-col cols="4">
            <v-combobox
              v-model="options.tag"
              :items="tags"
              label="Category"
              :loading="!tags"
              item-text="title"
              hide-details
              return-object
              clearable
              outlined
              dense>
              <template v-slot:item="{ item }">
                <v-badge
                  :content="exercisesStats.byTags[item.id]"
                  :value="!!exercisesStats && exercisesStats.byTags[item.id]"
                  inline>{{item.title}}
                </v-badge>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="4">
            <v-combobox
              v-model="options.from"
              :items="langs"
              label="From"
              :loading="!langs"
              item-text="title"
              hide-details
              return-object
              clearable
              outlined
              dense>
              <template v-slot:item="{ item }">
                <v-badge
                  :content="exercisesStats.byFrom[item.id]"
                  :value="!!exercisesStats && exercisesStats.byFrom[item.id]"
                  inline>{{item.title}}
                </v-badge>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="4">
            <v-combobox
              v-model="options.to"
              :items="langs"
              label="To"
              :loading="!langs"
              item-text="title"
              hide-details
              return-object
              clearable
              outlined
              dense>
              <template v-slot:item="{ item }">
                <v-badge
                  :content="exercisesStats.byTo[item.id]"
                  :value="!!exercisesStats && exercisesStats.byTo[item.id]"
                  inline>{{item.title}}
                </v-badge>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="6"
            xl="4"
            :key="exercise.id"
            v-for="exercise in exercises">
            <ExerciseCard
              :exercise="exercise"/>
          </v-col>
        </v-row>

        <v-pagination
          v-model="options.page"
          :length="totalExercises"
          :total-visible="5"
        ></v-pagination>
      </v-col>
    </v-row>
  </fragment>
</template>

<script>
  import LangsMixin from '../mixins/LangsMixin'
  import TagsMixin from '../mixins/TagsMixin'
  import ExercisesStatsMixin from '../mixins/ExercisesStatsMixin'
  import lodash from 'lodash'
  import ExerciseCard from './home/ExerciseCard'
  import { Fragment } from 'vue-fragment'
  import { API_EXERCISES_USER } from '../constants/paths'
  import AppBarMixin from '../mixins/AppBarMixin'

  export default {
    name: 'Home',
    mixins: [
      LangsMixin, TagsMixin, ExercisesStatsMixin, AppBarMixin
    ],
    data: function () {
      return {
        totalExercises: 0,
        exercises: [],
        options: {
          page: 1,
          itemsPerPage: 12,
          from: undefined,
          to: undefined,
          tag: undefined
        }
      }
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      }
    },
    mounted () {
      this.startLoading()
      this.getDataFromApi()
    },
    methods: {
      getDataFromApi () {
        return this.$http({
          url: API_EXERCISES_USER,
          method: 'GET',
          params: {
            page: this.options.page - 1,
            size: this.options.itemsPerPage,
            from: lodash.get(this.options, 'from.id'),
            to: lodash.get(this.options, 'to.id'),
            tag: lodash.get(this.options, 'tag.id')
          }
        }).then(data => {
          this.exercises = data.items
          this.totalExercises = data.totalPages
        }).catch(response => {
          this.exercises = []
        }).finally(() => this.stopLoading())
      }
    },
    components: {
      ExerciseCard,
      Fragment
    }
  }
</script>

<style scoped>

</style>
