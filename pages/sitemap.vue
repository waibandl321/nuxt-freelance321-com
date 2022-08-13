<template>
  <div>
    <CommonMessageViewer :message="message" />
    <v-row>
      <template v-for="(category, i) in categories">
        <v-col
          v-if="judgePostExists(category)"
          :key="i"
          cols="4"
          class="mt-10"
        >
          <div class="sitemap-category">
            {{ category.name }}
          </div>
          <ul class="post-list">
            <li
              v-for="(post, idx2) in category.posts.data"
              :key="idx2"
              @click="clickPostLink(post)"
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
  head () {
    return {
      title: 'サイトマップ'
    }
  },
  computed: {
    store_categories () {
      return this.storeGetCategories()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      try {
        this.store_categories.forEach(async (item) => {
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
    },
    clickPostLink (post) {
      const current_category = this.categories.find(v => v.id === post.categories[0])
      this.pageMovePost(current_category, post)
    }
  }
}
</script>

<style scoped>
.sitemap-category {
  font-weight: bold;
  font-size: 16px;
}
.post-list {
  font-size: 14px;
  margin-top: 12px;
}
</style>
