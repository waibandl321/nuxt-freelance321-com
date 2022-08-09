<template>
  <div>
    <CommonMessageViewer :message="message" />
    <CommonLoadingPageInner v-if="loading" />
    <v-row v-if="!loading">
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
            :src="imagePath(item)"
            aspect-ratio="1.7"
          />
          <v-card-subtitle>
            {{ item.title.rendered }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center mt-10 pagination">
      <v-pagination
        v-model="current_page"
        :length="15"
        :total-visible="7"
        @input="$fetch"
      />
    </div>
  </div>
</template>

<script>
// import store from "@/store"
export default {
  name: 'PostList',
  data () {
    return {
      posts_base_url: 'https://freelance321.com/wp-json/wp/v2/posts',
      current_page: 1,
      per_page: 8,
      pagination: [],

      category_base_url: 'https://freelance321.com/wp-json/wp/v2/categories/',

      posts: [],

      loading: false,
      message: {
        error: '',
        success: ''
      }
    }
  },
  async fetch () {
    this.loading = true
    try {
      const results = await this.$axios.get(
        this.posts_base_url +
        '?_embed' +
        '&page=' + this.current_page +
        '&per_page=' + this.per_page
      )
      this.posts = results.data
      this.setPaginations(results)
    } catch {
      this.message.error = 'データの読み込みに失敗しました。'
    }
    this.loading = false
  },
  methods: {
    imagePath (item) {
      const base_url = 'https://freelance321.com/wp-content/uploads/'
      return base_url + item._embedded['wp:featuredmedia'][0].media_details.file
    },
    setPaginations (results) {
      const total_page_num = Math.ceil(results.headers['x-wp-total'] / this.per_page)
      for (let i = 1; i < total_page_num; i++) {
        this.pagination.push(total_page_num[i])
      }
    },
    async clickPostCard (post) {
      let category_slug = ''
      let parent_category_slug = ''
      let route_path = ''
      const category_id = post.categories[0]

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
      route_path = parent_category_slug + '/' + category_slug + '/' + post.slug
      this.$router.push(route_path)
    },
    changePage (number) {
      this.posts = []
      this.current_page = number
      this.$fetch()
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