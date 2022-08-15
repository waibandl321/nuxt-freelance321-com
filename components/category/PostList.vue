<template>
  <div>
    <CommonMessageViewer :message="message" />
    <CommonLoadingPageInner v-if="loading" />
    <v-row v-else>
      <v-col
        v-for="(item, idx) in posts"
        :key="idx"
        md="4"
        sm="6"
        cols="12"
      >
        <v-card
          hover
          @click="clickPostCard(item)"
        >
          <v-img
            :src="getEyecatchUrl(item)"
            aspect-ratio="1.7"
            style="background-color: #f8f5f5;"
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
      posts: [],

      current_page: 1,
      per_page: 8,
      page_max: 1
    }
  },
  async fetch () {
    await this.initPostList()
  },
  computed: {
    categories () {
      return this.storeGetCategories()
    }
  },
  methods: {
    async initPostList () {
      this.loading = true
      this.posts = await this.apiGetCategoryPostList(
        this.$route.query.c,
        this.current_page,
        this.per_page,
        this.apiTypeDefault()
      ).then((response) => {
        this.setPaginations(response)
        return response.data
      }).catch(() => {
        this.message.error = 'データの読み込みに失敗しました。'
      })
      this.loading = false
    },
    getEyecatchUrl (item) {
      if (item._embedded['wp:featuredmedia']) {
        return this.media.media_base_url + item._embedded['wp:featuredmedia'][0].media_details.file
      }
    },
    setPaginations (results) {
      this.page_max = Math.ceil(results.headers['x-wp-total'] / this.per_page)
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
.p-relative {
  position: relative;
}
.pagination >>> .theme--light.v-pagination .v-pagination__item--active {
  background: #1867c0;
}
</style>
