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
import { defineComponent, reactive, ref } from 'vue'
import { useFetch } from '@nuxtjs/composition-api'
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

    const categories = ref([])

    useFetch(async () => {
      state.loading = true
      try {
        categories.value = await apiGetCategories().then(response => response.data)
      } catch (error) {
        categories.value = []
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
