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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    search: {
      type: Function
    }
  },
  setup (props) {
    const search_query = ref('')

    function handleInput () {
      props.search(search_query.value)
    }

    return {
      search_query,
      handleInput
    }
  }
})
</script>
