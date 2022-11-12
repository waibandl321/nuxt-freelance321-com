<template>
  <div>
    <v-breadcrumbs class="px-0 pt-0">
      <v-breadcrumbs-item
        class="post-breadcrumb-item primary--text"
        :disabled="false"
        @click="clickBreadcrumbs(breadcrumb.category)"
      >
        {{ breadcrumb.category.name }}
      </v-breadcrumbs-item>
      <span class="mx-3">/</span>
      <v-breadcrumbs-item
        class="post-breadcrumb-item primary--text"
        :disabled="true"
      >
        {{ breadcrumb.post.title }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { useFetch, useRoute, useRouter } from '@nuxtjs/composition-api'
import { defineComponent, reactive, ref, watch } from 'vue'
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
    const breadcrumb = reactive({
      category: {} as Category,
      post: {} as {
        title: string
      }
    })
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
      const category: Category | undefined = categories.value.find(v => v.slug === route.value.params.category)
      if (category) {
        breadcrumb.category = category
      }
      breadcrumb.post = {
        title: props.post.title.rendered
      }
    }

    function clickBreadcrumbs (item: Category) {
      useMoveCategory(router, item)
    }

    return {
      breadcrumb,
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
