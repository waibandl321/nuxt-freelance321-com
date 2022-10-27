<template>
  <div>
    <CommonLoadingPageInner v-if="!page_data" />
    <div
      v-else
      class="post-content"
      v-html="page_content"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { apiGetPageDetail } from '~/api/api'
import type { Page } from '@/types/page'

type DataType = {
  page_data: Page | null
}

export default Vue.extend({
  layout: 'page',
  data (): DataType {
    return {
      page_data: null
    }
  },
  async fetch () {
    this.page_data = await apiGetPageDetail(this.$route.name)
  },
  head () {
    return {
      title: 'プライバシーポリシー'
    }
  },
  computed: {
    page_content (): string | undefined {
      return this.page_data?.data[0].content.rendered
    }
  }
})
</script>
