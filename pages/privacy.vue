<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app>
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
  </v-app>
</template>

<script lang="ts">
import { useFetch, useMeta, useRoute, computed, defineComponent, reactive } from '@nuxtjs/composition-api'
import { useFetchPage } from '~/utils/api'
import type { Page } from '~/types'

type DataType = {
  page_data: Page | null
}

export default defineComponent({
  layout: 'page',
  setup () {
    const route = useRoute()
    const state = reactive({
      page_data: null
    }) as DataType

    useFetch(async () => {
      if (route.value.name) {
        state.page_data = await useFetchPage(route.value.name)
      }
    })

    const pageContent = computed(() => state.page_data?.data[0].content.rendered)
    const pageTitle = computed(() => state.page_data?.data[0].title.rendered)

    const { title } = useMeta({ title: 'プライバシーポリシー' })

    return {
      state,
      pageContent,
      pageTitle,
      title
    }
  },
  head: {}
})
</script>
