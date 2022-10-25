<template>
  <div>
    <CommonLoadingPageInner v-if="!page_data" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div
      v-else
      class="post-content"
      v-html="page_content"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isWpApi } from '@/api/api'
import type { PageDataType } from '@/types/page'

export default Vue.extend({
  layout: 'page',
  data (): { page_data: PageDataType | null } {
    return {
      page_data: null
    }
  },
  async fetch () {
    this.page_data = await this.apiGetPageDetail(this.$route.name, isWpApi)
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
