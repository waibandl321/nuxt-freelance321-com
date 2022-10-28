<template>
  <div class="search d-none d-sm-block">
    <SearchInput :search="search" />
    <!-- 検索結果？ -->
    <div
      v-if="search_items.length > 0"
      class="search-result"
    >
      <LoadingPageInner v-if="search_loading" />
      <SearchResult
        v-else
        :search-items="search_items"
        :click-search-item="clickSearchItem"
      />
    </div>
  </div>
</template>

<script>
import LoadingPageInner from '@/components/common/LoadingPageInner.vue'
import SearchResult from '@/components/search/SearchResult.vue'
import SearchInput from '@/components/search/SearchInput.vue'
import { isCustomApi, apiGetSearchPosts } from '~/utils/api'
// import { pageMovePost } from '@/utils/utils'

export default {
  components: {
    SearchResult,
    LoadingPageInner,
    SearchInput
  },
  data () {
    return {
      search_items: [],
      search_loading: false,
      search_error: ''
    }
  },
  methods: {
    async search (search_query) {
      this.search_loading = true
      if (!search_query) {
        this.search_items = []
        return
      }
      this.search_items = await apiGetSearchPosts(search_query, isCustomApi)
        .then((response) => {
          return response.data
        })
      this.search_loading = false
    },
    clickSearchItem (post) {
      this.search_items = []
      this.search_loading = false

      const categories = this.storeGetCategories()
      const current_category = categories.find((v) => {
        return v.id === post.category.term_id
      })
      this.$pageMovePost(current_category, post, categories)
    }
  }
}
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