<template>
  <div>
    <CommonMessageViewer :message="state.message" />
    <CommonLoadingPageInner v-if="state.loading" />
    <v-row v-else>
      <v-col
        v-for="(item, idx) in state.posts"
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
      v-if="!state.loading"
      class="text-center mt-10 pagination"
    >
      <v-pagination
        v-model="state.current_page"
        :length="state.page_max"
        @input="changePage"
      />
    </div>
  </div>
</template>

<script>
import { useFetch, useRoute, defineComponent, reactive } from '@nuxtjs/composition-api'
import { MEDIA_API_PATH } from '@/config/blog'
import { apiGetCategoryPosts } from '@/utils/api'
// import type { Post } from '@/types/page'
// import { pageMovePost } from '@/utils/utils'

// type State = {
//   loading: boolean;
//   message: {
//     error: string;
//     success: String;
//   },
//   posts: Array<Post>,
//   current_page: number;
//   per_page: number;
//   page_max: number;
// }

export default defineComponent({
  setup () {
    const route = useRoute()
    const state = reactive({
      loading: false,
      message: {
        error: '',
        success: ''
      },
      posts: [],

      current_page: 1,
      per_page: 8,
      page_max: 1
    })

    useFetch(async () => {
      await initPostList()
    })

    async function initPostList () {
      state.loading = true
      state.posts = await apiGetCategoryPosts(
        route.value.query.c,
        state.current_page,
        state.per_page
      ).then((response) => {
        setPaginations(response)
        return response.data
      }).catch(() => {
        state.message.error = 'データの読み込みに失敗しました。'
      })
      state.loading = false
    }

    function setPaginations (results) {
      state.page_max = Math.ceil(results.headers['x-wp-total'] / state.per_page)
    }

    const getEyecatchUrl = (item) => {
      if (item.jetpack_featured_media_url) {
        return item.jetpack_featured_media_url
      }
      return MEDIA_API_PATH + '2022/08/no-image.png'
    }

    const changePage = async (number) => {
      state.posts = []
      state.current_page = number
      await initPostList()
    }

    const clickPostCard = (post) => {
      const categories = this.storeGetCategories()
      const current_category = categories.find(v => v.id === post.categories[0])
      this.$pageMovePost(current_category, post, this.storeGetCategories())
    }

    return {
      state,
      getEyecatchUrl,
      clickPostCard,
      changePage
    }
  }
})
</script>
<style scoped>
.p-relative {
  position: relative;
}
.pagination >>> .theme--light.v-pagination .v-pagination__item--active {
  background: #1867c0;
}
</style>
