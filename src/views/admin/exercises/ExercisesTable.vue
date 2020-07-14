<template>
  <fragment>
    <v-row>
      <v-col cols="4" md="2">
        <v-combobox
          v-model="filter.tag"
          :items="tags"
          label="Category"
          :loading="!tags"
          item-text="title"
          hide-details
          return-object
          clearable
        ></v-combobox>
      </v-col>
      <v-col cols="4" md="2">
        <v-combobox
          v-model="filter.from"
          :items="langs"
          label="From"
          :loading="!langs"
          item-text="title"
          hide-details
          return-object
          clearable
        ></v-combobox>
      </v-col>
      <v-col cols="4" md="2">
        <v-combobox
          v-model="filter.to"
          :items="langs"
          label="To"
          :loading="!langs"
          item-text="title"
          hide-details
          return-object
          clearable
        ></v-combobox>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="exercises"
      :options.sync="options"
      :server-items-length="totalExercises"
      :loading="dataLoading"
      mobile-breakpoint="0"
    >
      <template v-slot:item.title="{ item }">
        <a>
          <router-link
            :to="{name: 'Exercise', params: { id: item.id }}"
            target="_blank">
            {{item.title}}
          </router-link>
        </a>
      </template>
      <template v-slot:item.langs="{ item }">
        {{item.from.code}} — {{item.to.code}}
      </template>
      <template v-slot:item.creator.name="{ item }">
        <user-name :user="item.creator"/>
      </template>
      <template v-slot:item.tags="{ item }">
        <v-tooltip :key="tag.id" v-for="tag in item.tags" top>
          <template #activator="{on}">
            <v-chip color="primary" v-on="on" class="ma-1" small dark>
              {{ tag.title }}
            </v-chip>
          </template>
          {{ tag.title }}
        </v-tooltip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template #activator="{on}">
            <router-link
              class="text-decoration-none"
              :to="{name: 'ExerciseEdit', params: { id: item.id }}"
              target="_blank">
              <v-icon
                class="mr-2"
                v-on="on"
                small
              > mdi-pencil
              </v-icon>
            </router-link>
          </template>
          Delete
        </v-tooltip>
        <v-tooltip top>
          <template #activator="{on}">
            <v-icon
              @click="onDelete(item)"
              v-on="on"
              small
            > mdi-delete
            </v-icon>
          </template>
          Delete
        </v-tooltip>
      </template>
    </v-data-table>
  </fragment>
</template>

<script>
  import UserName from '../../../components/UserName'
  import get from 'lodash/get'
  import LangsMixin from '../../../mixins/LangsMixin'
  import TagsMixin from '../../../mixins/TagsMixin'
  import { API_EXERCISES } from '../../../constants/paths'
  import AppBarMixin from '../../../mixins/AppBarMixin'
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'ExercisesTable',
    mixins: [
      LangsMixin, TagsMixin, AppBarMixin
    ],
    props: {
      onDelete: {
        type: Function,
        required: true
      }
    },
    data: function () {
      return {
        filter: {
          from: undefined,
          to: undefined,
          tag: undefined
        },
        totalExercises: 0,
        exercises: [],
        dataLoading: true,
        options: {},
        headers: [
          {
            text: 'Title',
            value: 'title'
          },
          {
            text: 'Creator',
            value: 'creator.name'
          },
          {
            text: 'Langs',
            value: 'langs',
            sortable: false
          },
          {
            text: 'Tags',
            value: 'tags',
            sortable: false
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false
          }
        ]
      }
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      },
      filter: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      },
      search: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      }
    },
    created () {
      this.showSearch('Search by Title or Creator')
    },
    methods: {
      getDataFromApi () {
        this.dataLoading = true
        const { sortBy, sortDesc, page, itemsPerPage } = this.options

        return this.$http({
          url: API_EXERCISES,
          method: 'Get',
          params: {
            page: page - 1,
            size: itemsPerPage,
            sort: sortBy[0],
            direction: sortDesc[0] ? 'desc' : 'asc',
            filter: this.search,
            from: get(this.filter, 'from.id'),
            to: get(this.filter, 'to.id'),
            tag: get(this.filter, 'tag.id')
          }
        }).then(data => {
          this.dataLoading = false
          this.exercises = data.items
          this.totalExercises = data.totalPages
        }).catch(response => {
          this.dataLoading = false
          this.exercises = []
        })
      }
    },
    components: {
      UserName,
      Fragment
    }
  }
</script>

<style scoped>

</style>
