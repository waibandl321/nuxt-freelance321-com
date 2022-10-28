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
        :length="state.page_max"
        :total-visible="7"
        @input="changePage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useFetch, defineComponent, reactive, PropType } from '@nuxtjs/composition-api'
import { MEDIA_API_PATH } from '@/config/blog'
import { apiGetPosts } from '@/utils/api'
import type { Category, Post, AxiosResponseType } from '@/types/page'
// import { pageMovePost } from '@/utils/utils'

type State = {
  loading: boolean;
  current_page: number;
  per_page: number;
  page_max: number;
  posts: Array<Post>;
  message: {
    error: string;
    success: String;
  },
}

export default defineComponent({
  props: {
    allCategory: {
      type: [] as PropType<Category[] | undefined>,
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      loading: false,
      current_page: 1,
      per_page: 8,
      page_max: 1,
      pagination: [],
      posts: [],
      message: {
        error: '',
        success: ''
      }
    }) as State

    useFetch(() => {
      readPosts()
    })

    async function readPosts (): Promise<void> {
      state.loading = true
      try {
        await apiGetPosts(state.current_page, state.per_page)
          .then((response: AxiosResponseType) => {
            state.page_max = setPaginations(response)
            state.posts = response.data
          })
      } catch {
        state.message.error = 'データの読み込みに失敗しました。'
      }
      state.loading = false

      function setPaginations (response_data: AxiosResponseType): number {
        return Math.ceil(Number(response_data.headers['x-wp-total']) / state.per_page)
      }
    }

    const imagePath = (item: Post): string => {
      if (item.jetpack_featured_media_url) {
        return item.jetpack_featured_media_url
      }
      return MEDIA_API_PATH + '2022/08/no-image.png'
    }

    const changePage = (page_number: number): void => {
      state.posts = []
      state.current_page = page_number
      readPosts()
    }

    const clickPostCard = (item: Post): void => {
      const current_category = props.allCategory.find((v: Category) => v.id === item.categories[0])
      this.$pageMovePost(current_category, item, props.allCategory)
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
