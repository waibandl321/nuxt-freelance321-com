<template>
  <div class="search p-relative d-none d-sm-block">
    <v-responsive max-width="260">
      <v-text-field
        v-model.trim="state.search_query"
        dense
        flat
        hide-details
        rounded
        solo
        placeholder="記事検索"
        append-icon="mdi-magnify"
        @input="handleInput"
        @focus="handleInput"
      />
    </v-responsive>
    <!-- 検索結果 -->
    <v-card
      v-if="state.search_items.length > 0"
      max-width="400"
      class="search__result"
    >
      <LoadingPageInner v-if="state.search_loading" />
      <v-list v-else>
        <v-list-item
          v-for="(post, index) in state.search_items"
          :key="index"
          dense
          link
          nuxt
          @click="clickSearchItem(post)"
        >
          <v-list-item-content>
            <v-list-item-title>
              <div class="d-inline-block">
                {{ post.title }}
              </div>
              <v-list-item-subtitle>
                {{ post.category.name }}
              </v-list-item-subtitle>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { useRouter, defineComponent, reactive, useFetch, ref } from '@nuxtjs/composition-api'
import LoadingPageInner from '../common/LoadingPageInner.vue'
import { useFetchCategories, useFetchSearchPosts } from '~/utils/api'
import { usePageMovePost } from '~/utils/utils'
import type { Category, SearchPost, AxiosResponseTypeArray } from '~/types'

interface StateType {
  search_query: string;
  search_items: Array<SearchPost>,
  search_loading: boolean,
  search_error: string
}

export default defineComponent({
  components: { LoadingPageInner },
  setup () {
    const router = useRouter()
    const state: StateType = reactive({
      search_query: '',
      search_items: [],
      search_loading: false,
      search_error: ''
    })

    const categories = ref([])
    useFetch(async () => {
      try {
        const response: AxiosResponseTypeArray = await useFetchCategories()
        categories.value = response.data
      } catch (error) {
        categories.value = []
      }
    })

    function handleInput (): void {
      if (!state.search_query) {
        state.search_loading = false
        state.search_items = []
        return
      }
      search()
    }

    async function search (): Promise<void> {
      state.search_loading = true
      const response: AxiosResponseTypeArray = await useFetchSearchPosts(state.search_query)
      state.search_items = response.data
      state.search_loading = false
    }

    // TODO: 引数item: 型エラー修正
    const clickSearchItem = (item: any): void => {
      state.search_items = []
      state.search_loading = false
      const current_category: Category | undefined = categories.value.find((v: Category) => {
        return v.id === item.category.term_id
      })
      if (current_category) {
        usePageMovePost(router, current_category, item)
      }
    }

    return {
      state,
      search,
      clickSearchItem,
      handleInput
    }
  }
})
</script>

<style lang="scss" scoped>
@import "assets/css/style.scss";
.search {
  &__result {
    font-size: 12px;
    position: absolute;
    top: 100%;
    right: 0;
    min-height: 200px;
    max-height: 500px;
    overflow-y: auto;
  }
}
</style>
