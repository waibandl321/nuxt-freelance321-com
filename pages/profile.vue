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
<script>
import { isWpApi } from '@/api/api'
export default {
  layout: 'page',
  data () {
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
    page_content () {
      return this.page_data.data[0].content.rendered
    },
    page_title () {
      return this.page_data.data[0].title.rendered
    }
  }
}
</script>
