<template>
  <div class="search d-none d-sm-block">
    <SearchInput :search="search" />
    <!-- 検索結果？ -->
    <div
      v-if="state.search_items.length > 0"
      class="search-result"
    >
      <LoadingPageInner v-if="state.search_loading" />
      <SearchResult
        v-else
        :search-items="state.search_items"
        :click-search-item="clickSearchItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter, defineComponent, reactive, computed, useFetch } from '@nuxtjs/composition-api'
import { apiGetCategories, apiGetSearchPosts } from '~/utils/api'
import { pageMovePost } from '~/utils/utils'
import { useCategoryStore } from '@/utils/store'
import type { Category, SearchPost, AxiosResponseType } from '@/types/page'

interface StateType {
  categories: Array<Category>,
  search_items: Array<SearchPost>,
  search_loading: boolean,
  search_error: string
}

export default defineComponent({
  setup () {
    const router = useRouter()
    const state = reactive({
      categories: [],
      search_items: [],
      search_loading: false,
      search_error: ''
    }) as StateType

    // TODO: 状態管理効率化
    const categoryStore = useCategoryStore()
    state.categories = computed(() => categoryStore.categories)
    useFetch(async () => {
      await apiGetCategories().then((response) => {
        categoryStore.setCategories(response.data)
      })
    })

    async function search (search_query: string): Promise<void> {
      state.search_loading = true
      if (!search_query) {
        state.search_items = []
        return
      }
      state.search_items = await apiGetSearchPosts(search_query)
        .then((response: AxiosResponseType) => {
          return response.data
        })
      state.search_loading = false
    }

    function clickSearchItem (post: SearchPost) {
      state.search_items = []
      state.search_loading = false

      const current_category = state.categories.find((v: Category) => {
        return v.id === post.category.term_id
      })
      pageMovePost(router, current_category, post, state.categories)
    }

    return {
      state,
      search,
      clickSearchItem
    }
  }
})
</script>

<style scoped>
.search {
  position: relative;
}
.search-result {
  font-size: 12px;
  width: 150%;
  position: absolute;
  top: 100%;
  right: 0;
  min-height: 200px;
  max-height: 500px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
