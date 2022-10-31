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
          <div class="sitemap-category">
            {{ category.name }}
          </div>
          <ul class="post-list">
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
import { useFetchCategories, useFetchSitemapPosts } from '~/utils/api'
import { usePageMovePost } from '~/utils/utils'
import type { Category, Post, AxiosResponseType } from '@/types/'

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
      await useFetchCategories()
        .then((res: AxiosResponseType) => {
          readCategoryPosts(res.data)
        })
        .catch((err) => {
          state.message.error = err
        })
    })

    function readCategoryPosts (categories: Category[]) {
      try {
        categories.filter((r: Category) => r.id !== 1)
          .forEach(async (category: Category) => {
            await useFetchSitemapPosts(category).then((res: AxiosResponseType) => {
              category.posts = res.data
            })
            state.categories.push(category)
          })
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

<style scoped>
.sitemap-category {
  font-weight: bold;
  font-size: 16px;
}
.post-list {
  font-size: 14px;
  margin-top: 12px;
}
</style>
