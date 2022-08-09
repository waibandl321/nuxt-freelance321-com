<template>
  <div>
    <CommonLoadingPageInner v-if="!categories" />
    <v-row tag="ul">
      <template v-for="(category, i) in categories">
        <v-col
          v-if="judgePostExists(category)"
          :key="i"
          tag="li"
          cols="4"
          class="mt-10"
        >
          <div class="sitemap-category">{{ category.name }}</div>
          <ul>
          <li
            v-for="(post, idx2) in category.posts.data"
            :key="idx2"
          >
            <a>{{ post.title.rendered }}</a>
          </li>
          </ul>
        </v-col>
      </template>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'SitemapPage',
  layout: 'page',
  data () {
    return {
      categories: [],
      posts_base_url: 'https://freelance321.com/wp-json/wp/v2/posts'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const results = this.$store.state.category_items
      const items = []
      results.forEach(async (item) => {
        item.posts = await this.$axios.get(
          this.posts_base_url +
          '?categories=' +
          item.id +
          '&per_page=100'
        )
        items.push(item)
      })
      this.categories = items
    },
    // 投稿0の場合はカテゴリー非表示にする
    judgePostExists (category) {
      return category.posts.data.length > 0
    }
  }
}
</script>

<style scoped>
.sitemap-category {
  font-weight: bold;
  font-size: 18px;
}
</style>
