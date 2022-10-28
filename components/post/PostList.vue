<template>
  <div>
    <CommonMessageViewer :message="state.message" />
    <CommonLoadingPageInner v-if="state.loading" />
    <v-row v-if="!state.loading">
      <v-col
        v-for="(item, idx) in state.posts"
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
      v-if="!state.loading"
      class="text-center mt-10 pagination"
    >
      <v-pagination
        v-model="state.current_page"
        :length="15"
        :total-visible="7"
        @input="changePage"
      />
    </div>
  </div>
</template>

<script>
import { useFetch, defineComponent, reactive } from '@nuxtjs/composition-api'
import { MEDIA_API_PATH } from '@/config/blog'
import { apiGetPosts } from '~/utils/api'
// import type { Post } from '@/types/page'
// import { pageMovePost } from '@/utils/utils'

// type State = {
//   loading: boolean;
//   current_page: number;
//   per_page: number;
//   pagination: [];
//   posts: Array<Post>;
//   message: {
//     error: string;
//     success: String;
//   },
// }

export default defineComponent({
  setup () {
    const state = reactive({
      loading: false,
      current_page: 1,
      per_page: 8,
      pagination: [],
      posts: [],
      message: {
        error: '',
        success: ''
      }
    })

    useFetch(() => {
      readPosts()
    })

    async function readPosts () {
      state.loading = true
      try {
        state.posts = await apiGetPosts(state.current_page, state.per_page)
          .then((response) => {
            setPaginations(response)
            return response.data
          })
      } catch {
        state.message.error = 'データの読み込みに失敗しました。'
      }
      state.loading = false
    }

    function setPaginations (posts) {
      const total_page_num = Math.ceil(posts.headers['x-wp-total'] / state.per_page)
      for (let i = 1; i < total_page_num; i++) {
        state.pagination.push(total_page_num[i])
      }
    }

    const imagePath = (item) => {
      if (item.jetpack_featured_media_url) {
        return item.jetpack_featured_media_url
      }
      return MEDIA_API_PATH + '2022/08/no-image.png'
    }

    const changePage = (number) => {
      state.posts = []
      state.current_page = number
      readPosts()
    }

    const clickPostCard = (post) => {
      const categories = this.storeGetCategories()
      const current_category = categories.find(v => v.id === post.categories[0])
      this.$pageMovePost(current_category, post, this.storeGetCategories())
    }

    return {
      state,
      imagePath,
      clickPostCard,
      changePage
    }
  }
})
</script>

<style scoped>
.pagination >>> .theme--light.v-pagination .v-pagination__item--active {
  background: #1867c0;
}
</style>
