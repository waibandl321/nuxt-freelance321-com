<template>
  <div>
    {{ page_data }}
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
  created () {
    // this.slug = this.$route.name
    // this.getPageData()
  },
  methods: {
    // async getPageData () {
    //   this.page_data = await this.$axios.get(
    //     this.base_url +
    //     this.slug
    //   )
    // }
  }
}
</script>
