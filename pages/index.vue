<!-- TOP -->
<template>
  <div>
    <PostList :all-category="categories" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useFetch } from '@nuxtjs/composition-api'
import { useCategoryStore } from '@/utils/store'
import { apiGetCategories } from '~/utils/api'

export default defineComponent({
  layout: 'top',
  setup () {
    // TODO: 状態管理効率化
    const categoryStore = useCategoryStore()
    const categories = computed(() => categoryStore.categories)
    useFetch(async () => {
      await apiGetCategories().then((response) => {
        categoryStore.setCategories(response.data)
      })
    })

    return {
      categories
    }
  }
})
</script>
