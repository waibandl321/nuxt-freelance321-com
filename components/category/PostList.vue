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
            :src="imagePath(item)"
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
      categories: [],

      current_page: 1,
      per_page: 8,
      page_max: 1,

      media_base_path: 'https://freelance321.com/wp-content/uploads/',
      category_post_base_path: 'https://freelance321.com/wp-json/wp/v2/posts?categories='
    }
  },
  async fetch () {
    this.loading = true
    this.category_id = this.$route.query.c
    try {
      const results = await this.$axios.get(
        this.category_post_base_path +
        this.category_id +
        '&_embed' +
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
  created () {
    this.categories = this.$store.state.category_items
  },
  methods: {
    imagePath (item) {
      if (!item._embedded['wp:featuredmedia']) {
        return this.media_base_path + '2021/08/web-productions.jpg'
      }
      return this.media_base_path + item._embedded['wp:featuredmedia'][0].media_details.file
    },
    setPaginations (results) {
      this.page_max = Math.ceil(results.headers['x-wp-total'] / this.per_page)
    },
    clickPostCard (post) {
      let parent_category = null
      // 詳細データはAPIから取らずにストアに格納する
      this.$store.dispatch('setPostView', post)
      const current_category = this.categories.find(v => v.id === post.categories[0])
      // 親カテゴリー
      if (current_category.parent !== 0) {
        parent_category = this.categories.find(r => r.id === current_category.parent)
        this.$router.push(
          parent_category.slug + '/' + current_category.slug + '/' + post.slug
        )
        return
      }
      this.$router.push(
        {
          path: this.$route.params.category + '/' + post.slug,
          query: { p: post.id }
        }
      )
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
