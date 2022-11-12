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
          @click="handleClickPost(item)"
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
import { useFetch, useRoute, defineComponent, reactive, PropType, useRouter } from '@nuxtjs/composition-api'
import { MediaBasePath, useFetchCategoryPosts } from '@/utils/api'
import { usePageMovePost } from '@/utils/utils'
import type { Post, Category, AxiosResponseTypeArray } from '~/types'

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
  props: {
    allCategory: {
      type: [] as PropType<Category[] | undefined>,
      required: true
    }
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
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
      try {
        const response: AxiosResponseTypeArray = await useFetchCategoryPosts(route.value.query.c, state.current_page, state.per_page)
        state.page_max = setPaginations(response)
        state.posts = response.data
      } catch {
        state.message.error = 'データの読み込みに失敗しました。'
      }
      state.loading = false

      function setPaginations (response: AxiosResponseTypeArray): number {
        return Math.ceil(Number(response.headers['x-wp-total']) / state.per_page)
      }
    }

    const getEyecatchUrl = (item: Post): string => {
      if (item.jetpack_featured_media_url) {
        return item.jetpack_featured_media_url
      }
      return MediaBasePath + '2022/08/no-image.png'
    }

    const changePage = (page_number: number): void => {
      state.posts = []
      state.current_page = page_number
      initPostList()
    }

    const handleClickPost = (item: Post): void => {
      const current_category = props.allCategory?.find((v: Category) => v.id === item.categories[0])
      if (current_category) {
        usePageMovePost(router, current_category, item)
      }
    }

    return {
      state,
      getEyecatchUrl,
      handleClickPost,
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
