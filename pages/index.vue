<!-- TOP -->
<template>
  <div>
    <LoadingPageInner v-if="state.loading" />
    <PostList
      v-else
      :all-category="categories"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive } from 'vue'
import { useFetch } from '@nuxtjs/composition-api'
import { useCategoryStore } from '@/utils/store'
import CategoryStoreKey from '@/utils/category-key'
import { apiGetCategories } from '~/utils/api'
import LoadingPageInner from '~/components/common/LoadingPageInner.vue'

type State = {
  loading: boolean
}

export default defineComponent({
  components: { LoadingPageInner },
  layout: 'top',
  setup () {
    const state = reactive({
      loading: false
    }) as State
    provide(CategoryStoreKey, useCategoryStore())
    // TODO: 状態管理効率化
    const categoryStore = useCategoryStore()
    const categories = computed(() => categoryStore.categories)
    useFetch(async () => {
      state.loading = true
      try {
        await apiGetCategories().then((response) => {
          categoryStore.setCategories(response.data)
        })
      } catch (error) {
        console.log(error)
      }
      state.loading = false
    })
    return {
      state,
      categories
    }
  }
})
</script>
