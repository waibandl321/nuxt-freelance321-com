<template>
  <v-responsive max-width="260">
    <v-text-field
      v-model.trim="search_query"
      dense
      flat
      hide-details
      rounded
      solo
      placeholder="記事検索"
      append-icon="mdi-magnify"
      @input="handleInput()"
    />
  </v-responsive>
</template>

<script>
export default {
  props: {
    search: Function
  },
  data () {
    return {
      search_query: ''
    }
  },
  methods: {
    handleInput () {
      this.search(this.search_query)
    }
  }
}
</script>
