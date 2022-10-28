<template>
  <v-app>
    <CommonHeader :category-list="categoryList" />
    <v-main>
      <v-container>
        {{ state.categories }}
      </v-container>
    </v-main>
    <CommonFooter />
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
import { defineComponent, reactive, ref, useFetch, useMeta } from '@nuxtjs/composition-api'
// import { apiGetSitemapPosts } from '@/utils/api'
// import { categoryStore } from '@/utils/store'
import { readCategories } from '~/utils/utils'
import type { Category } from '@/types/page'

type DataType = {
  categories: Category[],
  message: {
    error: string | unknown
  }
}

export default defineComponent({
  setup () {
    // const useCategoryStore = categoryStore()
    const categoryList = ref<Category[]>([])
    const state = reactive<DataType>({
      categories: [],
      message: {
        error: ''
      }
    })
    useFetch(async () => {
      categoryList.value = await readCategories()
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
      title,
      categoryList
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
