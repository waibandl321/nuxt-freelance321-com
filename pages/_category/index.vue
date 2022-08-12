<!-- TOP -->
<template>
  <v-row>
    <v-col cols="3">
      <CategorySideBar />
    </v-col>
    <v-col cols="9">
      <v-card-title class="px-0">
        カテゴリー：{{ category.name }}
      </v-card-title>
      <v-card-text class="px-0">
        {{ category.description }}
      </v-card-text>
      <CategoryPostList />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CategoryParentPage',
  layout: 'post',
  data () {
    return {
      category: {},
      loading: false
    }
  },
  async fetch () {
    this.loading = true
    if (this.$route.query.c) {
      await this.apiGetCategoryFromId(
        this.$route.query.c,
        this.apiTypeDefault()
      ).then((res) => {
        this.category = res.data
      })
    } else {
      // queryなしの場合（旧サイト対応)
      await this.apiGetCategoryFromSlug(
        this.$route.params.category,
        this.apiTypeDefault()
      ).then((res) => {
        this.category = res.data[0]
      })
    }
    this.loading = false
  }
}
</script>
