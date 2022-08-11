<template>
  <div>
    <CommonLoadingPageInner v-if="!page_data" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div
      v-else
      v-html="page_content"
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
  computed: {
    page_content () {
      return this.page_data.data[0].content.rendered
    }
  }
}
</script>
