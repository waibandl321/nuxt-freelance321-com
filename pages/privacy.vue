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
<script>
import { isWpApi } from '@/api/api'
export default {
  name: 'PrivacyPage',
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
      title: 'プライバシーポリシー'
    }
  },
  computed: {
    page_content () {
      return this.page_data.data[0].content.rendered
    }
  }
}
</script>
