<!-- TOP -->
<template>
  <v-row>
    <v-col cols="3" class="d-none d-sm-block">
      <CategorySideBar />
    </v-col>
    <v-col
      v-if="category"
      cols="12"
      sm="9"
    >
      <v-card-title class="px-0 pt-0">
        カテゴリー：{{ category.name }}
      </v-card-title>
      <v-card-subtitle class="px-0">
        記事数：{{ category.count }}
      </v-card-subtitle>
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
      title: this.meta.title,
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
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
