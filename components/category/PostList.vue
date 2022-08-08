<template>
  <div>
    <CommonMessageViewer :message="message" />
    <CommonLoadingPageInner v-if="loading" />
    <v-row v-else>
      <v-col
        v-for="(item, idx) in posts"
        :key="idx"
        cols="4"
        md="3"
        sm="2"
        xs="1"
      >
        <v-card
          hover
          @click="clickPostCard(item)"
        >
          <v-img
            :src="item.eyecatch.data.source_url"
            aspect-ratio="1.7"
          />
          <v-card-subtitle>
            {{ item.title.rendered }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <div
      v-if="!loading"
      class="text-center mt-10 pagination"
    >
      <v-pagination
        v-model="current_page"
        :length="page_max"
        @input="changePage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryPostList',
  data () {
    return {
      loading: false,
      message: {
        error: '',
        success: ''
      },

      category_id: '',
      posts: [],

      current_page: 1,
      per_page: 8,
      page_max: 1,

      media_base_url: 'https://freelance321.com/wp-json/wp/v2/media/'
    }
  },
  created () {
    this.getPostList()
  },
  methods: {
    async getPostList () {
      this.loading = true
      this.category_id = this.$route.query.c
      try {
        const items = []
        const results = await this.$axios.get(
          'https://freelance321.com/wp-json/wp/v2/posts?categories=' +
          this.category_id +
          '&page=' + this.current_page +
          '&per_page=' + this.per_page
        )
        for (const item of results.data) {
          if (item.featured_media !== 0) {
            item.eyecatch = await this.$axios.get(
              this.media_base_url + item.featured_media
            )
          }
          items.push(item)
        }
        this.setPaginations(results)
        this.posts = items
      } catch {
        this.message.error = 'データの読み込みに失敗しました。'
      }
      this.loading = false
    },
    setPaginations (results) {
      this.page_max = Math.ceil(results.headers['x-wp-total'] / this.per_page)
    },
    async clickPostCard (post) {
      let category_slug = ''
      let parent_category_slug = ''
      let route_path = ''
      const category_id = post.categories[0]
      // 詳細データはAPIから取らずにストアに格納する
      this.$store.dispatch('setPostView', post)
      // 記事詳細にアクセスするために必要なデータ
      // 1. カテゴリーパス
      // 2. サブカテゴリーパス
      // 3. 記事詳細
      // URL: base/category/subcategory/slug

      // 現在のカテゴリー
      const category = await this.$axios.get(
        this.category_base_url + category_id
      )
      category_slug = category.data.slug

      // 親カテゴリー
      if (category.data.parent !== 0) {
        const parent_category_id = category.data.parent
        const parent_category = await this.$axios.get(
          this.category_base_url + parent_category_id
        )
        parent_category_slug = parent_category.data.slug
      }
      console.log(category)
      route_path = parent_category_slug + '/' + category_slug + '/' + post.slug
      this.$router.push(route_path)
    },
    changePage (number) {
      this.posts = []
      this.current_page = number
      this.getPostList()
    }
  }
}
</script>
<style scoped>
.pagination >>> .theme--light.v-pagination .v-pagination__item--active {
  background: #1867c0;
}

.pagination {
  margin-top: 40px;
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
}
</style>
