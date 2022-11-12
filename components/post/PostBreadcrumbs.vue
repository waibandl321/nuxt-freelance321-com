<template>
  <v-breadcrumbs
    :items="breadcrumbs"
    class="px-0 pt-0"
  >
    <template #item="{ item }">
      <v-breadcrumbs-item
        class="post-breadcrumb-item primary--text"
        :disabled="item.disabled"
        @click="clickBreadcrumbs(item)"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import { useFetch, useRoute, useRouter } from '@nuxtjs/composition-api'
import { defineComponent, ref, watch } from 'vue'
import { useFetchCategories } from '~/utils/api'
import { useMoveCategory } from '~/utils/utils'
import type { AxiosResponseTypeArray, Category } from '~/types/'

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    const breadcrumbs = ref([])
    const categories = ref<Category[]>([])

    useFetch(async () => {
      const response: AxiosResponseTypeArray = await useFetchCategories()
      categories.value = response.data
    })

    watch(
      () => categories.value,
      (_categories) => {
        categories.value = _categories
        initBreadcrumb()
      },
      { deep: true }
    )

    function initBreadcrumb (): void {
      const results = []
      const post = {
        text: props.post.title.rendered,
        disabled: true
      }
      const category = {
        text: '',
        disabled: false,
        obj: {} as Category
      }

      const _category: Category | undefined = categories.value.find(v => v.slug === route.value.params.category)
      if (_category) {
        category.text = _category.name
        category.obj = _category
        results.push(category)
      }
      results.push(post)
      breadcrumbs.value = results
    }

    function clickBreadcrumbs (item) {
      useMoveCategory(router, item.obj)
    }

    return {
      breadcrumbs,
      clickBreadcrumbs
    }
  }
})
</script>

<style scoped>
.post-breadcrumb-item >>> .v-breadcrumbs__item:hover {
  cursor: pointer;
}
.post-breadcrumb-item >>> .v-breadcrumbs__item.v-breadcrumbs__item--disabled:hover {
  cursor: initial;
}
</style>
