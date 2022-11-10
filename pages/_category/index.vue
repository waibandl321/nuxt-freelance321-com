<!-- TOP -->
<template>
  <div>
    <div v-if="state.category">
      <v-card-title class="px-0 pt-0">
        カテゴリー：{{ state.category.name }}
      </v-card-title>
      <v-card-subtitle class="px-0">
        記事数：{{ state.category.count }}
      </v-card-subtitle>
    </div>

    <CategoryPostList :all-category="categories" />
  </div>
</template>

<script lang="ts">
import { useFetch, useMeta, useRoute, useRouter } from '@nuxtjs/composition-api'
import { defineComponent, reactive, ref } from 'vue'
import { useFetchCategories, useFetchCategory } from '@/utils/api'
import { useRedirectNotFount } from '@/utils/utils'
import type { AxiosResponseTypeArray, Category } from '~/types'

type State = {
  category: Category | null
}

export default defineComponent({
  layout: 'post',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive<State>({
      category: null
    })
    // TODO: 状態管理効率化
    const categories = ref<Category[]>([])

    useFetch(async () => {
      if (!route.value.query.c) {
        return useRedirectNotFount(router)
      }

      const responseCategories: AxiosResponseTypeArray = await useFetchCategories()
      categories.value = responseCategories.data

      await useFetchCategory(route.value.query.c)
        .then((res) => {
          state.category = res.data
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            if (err.message.includes('404')) {
              useRedirectNotFount(router)
            }
          }
        })
    })

    const { title } = useMeta({ title: state.category?.name })

    return {
      state,
      title,
      categories
    }
  },
  head: {}
})
</script>
