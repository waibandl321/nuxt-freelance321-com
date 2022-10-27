<template>
  <div>
    <CommonMessageViewer :message="message" />
    <CommonLoadingPageInner v-if="loading" />
    <v-row v-if="!loading">
      <v-col
        v-for="(item, idx) in posts"
        :key="idx"
        lg="3"
        md="4"
        sm="6"
        cols="12"
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
import { MEDIA_API_PATH } from '@/config/blog'
import { isWpApi, apiGetPosts } from '~/api/api'
// import { this.$pageMovePost } from '@/utils/utils'

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
      this.posts = await apiGetPosts(this.current_page, this.per_page, isWpApi)
        .then((response) => {
          this.setPaginations(response)
          return response.data
        })
    } catch {
      this.message.error = 'データの読み込みに失敗しました。'
    }
    this.loading = false
  },
  methods: {
    imagePath (item) {
      if (item.jetpack_featured_media_url) {
        return item.jetpack_featured_media_url
      }
      return MEDIA_API_PATH + '2022/08/no-image.png'
    },
    setPaginations (results) {
      const total_page_num = Math.ceil(results.headers['x-wp-total'] / this.per_page)
      for (let i = 1; i < total_page_num; i++) {
        this.pagination.push(total_page_num[i])
      }
    },
    clickPostCard (post) {
      const categories = this.storeGetCategories()
      const current_category = categories.find(v => v.id === post.categories[0])
      this.$pageMovePost(current_category, post, this.storeGetCategories())
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
