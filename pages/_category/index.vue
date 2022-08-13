<!-- TOP -->
<template>
  <v-row>
    <v-col cols="3">
      <CategorySideBar />
    </v-col>
    <v-col cols="9" v-if="category">
      <v-card-title class="px-0">
        カテゴリー：{{ category.name }}
      </v-card-title>
      <v-card-subtitle class="px-0">
        記事数：{{ category.count }}
      </v-card-subtitle>
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
      meta: {
        title: ''
      }
    }
  },
  async fetch () {
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
  },
  head () {
    return {
      title: this.meta.title
    }
  },
  watch: {
    // MEMO: 非同期処理で投稿取得するため、取得状況を監視してmeta titleに割り当てる
    category (newValue) {
      this.meta.title = newValue.name
    }
  }
}
</script>
