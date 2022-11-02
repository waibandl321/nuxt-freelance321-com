<template>
  <div>
    <LoadingPageInner v-if="loading" />
    <PostList
      v-else
      :all-category="categories"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useFetch } from '@nuxtjs/composition-api'
import { useFetchCategories } from '~/utils/api'
import LoadingPageInner from '~/components/common/LoadingPageInner.vue'
import { Category } from '~/types'

export default defineComponent({
  components: { LoadingPageInner },
  layout: 'top',
  setup () {
    const loading = ref(false)
    const categories: Ref<Category[]> = ref([])

    useFetch(async () => {
      loading.value = true
      try {
        categories.value = await useFetchCategories().then(response => response.data)
      } catch (error) {
        categories.value = []
        console.log(error)
      }
      loading.value = false
    })
    return {
      loading,
      categories
    }
  }
})
</script>
