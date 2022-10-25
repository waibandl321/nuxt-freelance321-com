<template>
  <div>
    <CommonMessageViewer :message="message" />
    <div
      v-for="(category, i) in categories"
      :key="i"
      class="mb-10"
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isWpApi } from '@/api/api'

interface Caregory {

}

interface Data {
  categories: Array<Caregory>;
  message: {
    error: string;
  }
}

export default Vue.extend({
  layout: 'page',
  data () {
    return {
      categories: [],
      message: {
        error: ''
      }
    } as Data
  },
  head () {
    return {
      title: 'サイトマップ'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const categories = this.storeGetCategories()
      try {
        categories.forEach(async (category) => {
          category.posts = await this.apiGetSitemapPosts(category, isWpApi)
          this.categories.push(category)
        })
      } catch (error) {
        this.message.error = error
      }
    },
    clickPostLink (post) {
      const current_category = this.categories.find(v => v.id === post.categories[0])
      this.$pageMovePost(current_category, post, this.storeGetCategories())
    }
  }
})
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
