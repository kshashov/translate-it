<template>
  <div class="pa-4">
    <v-row justify="start">
      <v-col cols="12">
        <v-card tile>
          <v-card-text>
            <v-row justify="end">
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
                  dense
                >
                  <template v-slot:item="{ item }">
                    <v-badge
                      :content="exercisesStats.byTags[item.id]"
                      :value="!!exercisesStats && (exercisesStats.byTags[item.id] !== 0)"
                      inline>{{item.title}}
                    </v-badge>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
            <v-row justify="end">
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
                  dense
                >
                  <template v-slot:item="{ item }">
                    <v-badge
                      :content="exercisesStats.byFrom[item.id]"
                      :value="!!exercisesStats && (exercisesStats.byFrom[item.id] !== 0)"
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
                  dense
                >
                  <template v-slot:item="{ item }">
                    <v-badge
                      :content="exercisesStats.byTo[item.id]"
                      :value="!!exercisesStats && (exercisesStats.byTo[item.id] !== 0)"
                      inline>{{item.title}}
                    </v-badge>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-progress-linear
            indeterminate
            color="primary"
            :active="loading"
            absolute
            bottom
          />
        </v-card>
      </v-col>

      <v-col
        :cols="4"
        :key="exercise.id"
        v-for="exercise in exercises"
      >
        <v-card>
          <v-card-subtitle>
            {{exercise.from.code}} - {{exercise.from.code}}
          </v-card-subtitle>
          <v-card-title>
            {{exercise.title}}
          </v-card-title>
          <v-card-text>
            <v-chip :key="tag.id" v-for="tag in exercise.tags" class="ma-1">
              {{tag.title}}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-pagination
      v-model="options.page"
      :length="totalExercises"
      :total-visible="5"
    ></v-pagination>
  </div>
</template>

<script>
  import LangsMixin from '../mixins/LangsMixin'
  import TagsMixin from '../mixins/TagsMixin'
  import ExercisesStatsMixin from '../mixins/ExercisesStatsMixin'
  import lodash from 'lodash'

  export default {
    name: 'Home',
    mixins: [
      LangsMixin, TagsMixin, ExercisesStatsMixin
    ],
    data: function () {
      return {
        totalExercises: 0,
        exercises: [],
        loading: true,
        options: {
          page: 1,
          itemsPerPage: 10,
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
      this.getDataFromApi()
    },
    methods: {
      getDataFromApi () {
        this.loading = true

        return this.$http({
          url: '/api/exercises/',
          method: 'GET',
          params: {
            page: this.options.page - 1,
            size: this.options.itemsPerPage,
            from: lodash.get(this.options, 'from.id'),
            to: lodash.get(this.options, 'to.id'),
            tag: lodash.get(this.options, 'tag.id')
          }
        }).then(data => {
          this.loading = false
          this.exercises = data.items
          this.totalExercises = data.totalPages
        }).catch(response => {
          this.loading = false
          this.exercises = []
        })
      }
    },
    components: {}
  }
</script>

<style scoped>

</style>
