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

<script lang="ts">
import { useFetch, useRoute, defineComponent, reactive } from '@nuxtjs/composition-api'
import { MEDIA_API_PATH } from '@/config/blog'
import { apiGetCategoryPosts } from '@/utils/api'
import type { Post, Category, AxiosResponseType } from '@/types/page'

type State = {
  loading: boolean;
  message: {
    error: string;
    success: String;
  },
  posts: Array<Post>,
  current_page: number;
  per_page: number;
  page_max: number;
}

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
    }) as State

    useFetch(() => {
      initPostList()
    })

    async function initPostList (): Promise<void> {
      state.loading = true
      await apiGetCategoryPosts(route.value.query.c, state.current_page, state.per_page)
        .then((response: AxiosResponseType) => {
          state.page_max = setPaginations(response)
          state.posts = response.data
        }).catch(() => {
          state.message.error = 'データの読み込みに失敗しました。'
        })
      state.loading = false

      function setPaginations (response: AxiosResponseType): number {
        return Math.ceil(Number(response.headers['x-wp-total']) / state.per_page)
      }
    }

    const getEyecatchUrl = (item: Post): string => {
      if (item.jetpack_featured_media_url) {
        return item.jetpack_featured_media_url
      }
      return MEDIA_API_PATH + '2022/08/no-image.png'
    }

    const changePage = (page_number: number): void => {
      state.posts = []
      state.current_page = page_number
      initPostList()
    }

    const clickPostCard = (item: Post): void => {
      const categories = this.storeGetCategories()
      const current_category = categories.find((v: Category) => v.id === item.categories[0])
      this.$pageMovePost(current_category, item, this.storeGetCategories())
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
