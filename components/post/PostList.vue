<template>
  <div>
    <CommonMessageViewer :message="message" />
    <CommonLoadingPageInner v-if="loading" />
    <v-row v-if="!loading">
      <v-col
        v-for="(item, idx) in posts"
        :key="idx"
        cols="3"
      >
        <v-card
          hover
          @click="clickPostCard(item)"
        >
          <v-img
            :src="imagePath(item)"
            aspect-ratio="1.7"
            style="background-color: #f8f5f5"
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
        :length="15"
        :total-visible="7"
        @input="$fetch"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  data () {
    return {
      current_page: 1,
      per_page: 8,
      pagination: [],

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
      this.posts = await this.apiGetPostList(
        this.current_page,
        this.per_page,
        this.apiTypeDefault()
      ).then((response) => {
        this.setPaginations(response)
        return response.data
      })
    } catch {
      this.message.error = 'データの読み込みに失敗しました。'
    }
    this.loading = false
  },
  computed: {
    categories () {
      return this.storeGetCategories()
    }
  },
  methods: {
    imagePath (item) {
      if (item._embedded['wp:featuredmedia']) {
        return this.media.media_base_url + item._embedded['wp:featuredmedia'][0].media_details.file
      }
    },
    setPaginations (results) {
      const total_page_num = Math.ceil(results.headers['x-wp-total'] / this.per_page)
      for (let i = 1; i < total_page_num; i++) {
        this.pagination.push(total_page_num[i])
      }
    },
    clickPostCard (post) {
      const current_category = this.categories.find(v => v.id === post.categories[0])
      this.pageMovePost(current_category, post)
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
</style>
