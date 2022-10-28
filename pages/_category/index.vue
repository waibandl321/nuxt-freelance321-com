<!-- TOP -->
<template>
  <div>
    <v-card-title class="px-0 pt-0">
      カテゴリー：{{ state.category.name }}
    </v-card-title>
    <v-card-subtitle class="px-0">
      記事数：{{ state.category.count }}
    </v-card-subtitle>
    <CategoryPostList />
  </div>
</template>

<script lang="ts">
import { useFetch, useMeta, useRoute } from '@nuxtjs/composition-api'
import { defineComponent, reactive } from 'vue'
import { apiGetCategoryDetail } from '~/utils/api'
import type { Category } from '@/types/page'

type State = {
  category: Category | {}
}

export default defineComponent({
  layout: 'post',
  setup () {
    const route = useRoute()
    const state = reactive<State>({
      category: {}
    })
    useFetch(async () => {
      await apiGetCategoryDetail(route.value.query.c)
        .then((res) => {
          state.category = res.data
        })
    })

    const { title } = useMeta({ title: state.category.name })

    return {
      state,
      title
    }
  },
  head: {}
})
</script>
