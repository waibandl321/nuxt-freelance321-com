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
import { useFetch, useMeta, useRoute } from '@nuxtjs/composition-api'
import { computed, defineComponent, reactive } from 'vue'
import { apiGetCategories, apiGetCategoryDetail } from '@/utils/api'
import { useCategoryStore } from '@/utils/store'
import type { Category } from '@/types/page'

type State = {
  category: Category | null
}

export default defineComponent({
  layout: 'post',
  setup () {
    const route = useRoute()
    const state = reactive<State>({
      category: null
    })
    // TODO: 状態管理効率化
    const categoryStore = useCategoryStore()
    const categories = computed(() => categoryStore.getCategories())
    useFetch(async () => {
      await apiGetCategories().then((response) => {
        categoryStore.setCategories(response.data)
      })
      await apiGetCategoryDetail(route.value.query.c)
        .then((res) => {
          state.category = res.data
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
