<template>
  <div>
    <CommonLoadingPageInner v-if="!page_data" />
    <div
      v-else
      v-html="page_content"
      class="post-content"
    ></div>
  </div>
</template>
<script>
export default {
  name: 'PrivacyPage',
  layout: 'page',
  data () {
    return {
      page_data: null
    }
  },
  async fetch () {
    this.page_data = await this.apiGetPageRelatedSlug(
      this.$route.name,
      this.apiTypeDefault()
    )
  },
  head () {
    return {
      title: 'プロフィール'
    }
  },
  computed: {
    page_content () {
      return this.page_data.data[0].content.rendered
    }
  }
}
</script>
