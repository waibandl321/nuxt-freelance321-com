<!-- TOP -->
<template>
  <v-row>
    <v-col cols="3">
      <CategorySideBar />
    </v-col>
    <v-col cols="9">
      {{ category }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CategoryParentPage',
  layout: 'post',
  data () {
    return {
      category: {}
    }
  },
  created () {
    this.category = this.$store.state.category_view
  }
}
</script>
