<!-- TOP -->
<template>
  <div>
    <v-card-title class="px-0 pt-0">
      カテゴリー：{{ category.name }}
    </v-card-title>
    <v-card-subtitle class="px-0">
      記事数：{{ category.count }}
    </v-card-subtitle>
    <CategoryPostList />
  </div>
</template>

<script>
import { isWpApi, apiGetCategoryDetail } from '~/api/api'

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
    await apiGetCategoryDetail(this.$route.query.c, isWpApi)
      .then((res) => {
        this.category = res.data
      })
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
