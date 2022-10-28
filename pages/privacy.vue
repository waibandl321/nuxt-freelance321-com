<template>
  <v-app>
    <CommonHeader :category-list="categoryList" />
    <v-main>
      <v-container>
        <CommonLoadingPageInner v-if="!state.page_data" />
        <div v-else>
          <v-card-title
            class="px-0 font-weight-bold"
          >
            {{ pageTitle }}
          </v-card-title>
          <div
            class="post-content"
            v-html="pageContent"
          />
        </div>
      </v-container>
    </v-main>
    <CommonFooter />
  </v-app>
</template>

<script lang="ts">
import { useFetch, useMeta, useRoute, computed, defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import { apiGetPageDetail } from '~/utils/api'
import { readCategories } from '~/utils/utils'
import type { Category, Page } from '@/types/page'

type DataType = {
  page_data: Page | null
}

export default defineComponent({
  layout: 'page',
  setup () {
    const route = useRoute()
    const categoryList = ref<Category[]>([])
    const state = reactive({
      page_data: null
    }) as DataType

    useFetch(async () => {
      categoryList.value = await readCategories()
      state.page_data = await apiGetPageDetail(route.value.name)
    })

    const pageContent = computed(() => state.page_data?.data[0].content.rendered)
    const pageTitle = computed(() => state.page_data?.data[0].title.rendered)

    const { title } = useMeta({ title: 'プライバシーポリシー' })

    return {
      state,
      pageContent,
      pageTitle,
      categoryList,
      title
    }
  },
  head: {}
})
</script>
