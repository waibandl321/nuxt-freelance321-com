<template>
  <v-app>
    <v-container>
      <CommonMessageViewer :message="state.message" />
      <template v-if="state.categories.length > 0">
        <div
          v-for="(category, i) in state.categories"
          :key="i"
          class="mb-10"
        >
          <div class="sitemap__category">
            {{ category.name }}
          </div>
          <ul class="sitemap__posts">
            <li
              v-for="(post, idx2) in category.posts"
              :key="idx2"
              @click="handleClickPost(post)"
            >
              <a>{{ post.title.rendered }}</a>
            </li>
          </ul>
        </div>
      </template>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, useFetch, useMeta, useRouter } from '@nuxtjs/composition-api'
import { useFetchCategories, useFetchSitemapPosts } from '@/utils/api'
import { usePageMovePost } from '~/utils/utils'
import type { Category, Post, AxiosResponseTypeArray } from '@/types/'

type DataType = {
  categories: Category[],
  message: {
    error: string | unknown
  }
}

export default defineComponent({
  layout: 'page',
  setup () {
    const router = useRouter()
    const state = reactive<DataType>({
      categories: [],
      message: {
        error: ''
      }
    })

    useFetch(async () => {
      try {
        const response: AxiosResponseTypeArray = await useFetchCategories()
        readCategoryPosts(response.data)
      } catch (error) {
        state.message.error = error
      }
    })

    async function readCategoryPosts (categories: Category[]) {
      try {
        const filtered: Category[] = categories.filter((r: Category) => r.id !== 1)
        for (const category of filtered) {
          const response: AxiosResponseTypeArray = await useFetchSitemapPosts(category)
          category.posts = response.data
          state.categories.push(category)
        }
      } catch (error) {
        state.message.error = error
      }
    }

    const handleClickPost = (item: Post) => {
      const current_category = state.categories.find((v: Category) => v.id === item.categories[0])
      if (current_category) {
        usePageMovePost(router, current_category, item)
      }
    }

    const { title } = useMeta({ title: 'サイトマップ' })
    return {
      state,
      title,
      handleClickPost
    }
  },
  head: {}
})
</script>

<style scoped lang="scss">
@import "assets/css/style.scss";
.sitemap {
  &__category {
    font-weight: bold;
    font-size: $font-size-block-title;
  }
  &__posts {
    font-size: $font-size-default;
    margin-top: $font-size-small;
  }
}
</style>
