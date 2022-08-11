<template>
  <div>
    <CommonMessageViewer :message="message" />
    <v-row tag="ul">
      <template v-for="(category, i) in categories">
        <v-col
          v-if="judgePostExists(category)"
          :key="i"
          tag="li"
          cols="4"
          class="mt-10"
        >
          <div class="sitemap-category">
            {{ category.name }}
          </div>
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
      message: {
        error: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const categories = this.$store.state.category_items
      try {
        categories.forEach(async (item) => {
          item.posts = await this.apiGetPostsRelatedCategory(
            item,
            this.apiTypeDefault()
          )
          this.categories.push(item)
        })
      } catch (error) {
        this.message.error = error
      }
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
