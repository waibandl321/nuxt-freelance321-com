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
      base_url: 'https://freelance321.com/wp-json/wp/v2/pages?slug=',
      slug: '',
      page_data: null
    }
  },
  async fetch () {
    this.slug = this.$route.name
    this.page_data = await this.$axios.get(
      this.base_url +
      this.slug
    )
  },
  computed: {
    page_content () {
      return this.page_data.data[0].content.rendered
    }
  }
}
</script>
