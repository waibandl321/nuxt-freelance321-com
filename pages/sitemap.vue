<template>
  <v-app>
    <v-container>
      {{ state.categories }}
    </v-container>
  </v-app>
  <!-- <CommonMessageViewer :message="message" />
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
    </div> -->
</template>

<script lang="ts">
import { defineComponent, reactive, useMeta } from '@nuxtjs/composition-api'
import type { Category } from '@/types/'

type DataType = {
  categories: Category[],
  message: {
    error: string | unknown
  }
}

export default defineComponent({
  layout: 'page',
  setup () {
    const state = reactive<DataType>({
      categories: [],
      message: {
        error: ''
      }
    })

    // function readCategoryPosts () {
    //   const categories: Category[] = this.storeGetCategories()
    //   try {
    //     categories.forEach(async (category: Category) => {
    //       category.posts = await apiGetSitemapPosts(category)
    //       this.categories.push(category)
    //     })
    //   } catch (error) {
    //     this.message.error = error
    //   }
    // }
    // const store = categoryStore()
    // console.log(store.categories)
    const { title } = useMeta({ title: 'サイトマップ' })
    return {
      state,
      title
    }
  },
  head: {}
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
