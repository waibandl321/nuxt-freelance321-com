<template>
  <div>
    <CommonLoadingPageInner v-if="!page_data" />
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
      title: 'プロフィール'
    }
  },
  computed: {
    pageContent () : string | undefined {
      return this.page_data?.data[0].content.rendered
    },
    pageTitle () : string | undefined {
      return this.page_data?.data[0].title.rendered
    }
  }
})
</script>
