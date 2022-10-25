<template>
  <div>
    <CommonLoadingPageInner v-if="!page_data" />
    <div v-else>
      <v-card-title
        class="px-0 font-weight-bold"
      >
        {{ page_title }}
      </v-card-title>
      <div
        class="post-content"
        v-html="page_content"
      />
    </div>
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
      title: 'プロフィール'
    }
  },
  computed: {
    page_content (): string | undefined {
      return this.page_data?.data[0].content.rendered
    },
    page_title (): string | undefined {
      return this.page_data?.data[0].title.rendered
    }
  }
})
</script>
