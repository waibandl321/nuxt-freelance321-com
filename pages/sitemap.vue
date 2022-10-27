<template>
  <div>
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
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import { defineComponent, reactive, useMeta } from '@nuxtjs/composition-api'
// import { apiGetSitemapPosts } from '@/utils/api'
import type { Category } from '@/types/page'
import { categoryStore } from '@/utils/store'
// import { formatCategories } from '@/utils/utils'

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
    const { title } = useMeta({ title: 'サイトマップ' })
    const useCategoryStore = categoryStore()
    console.log(useCategoryStore.categories)

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

    return {
      state,
      title
    }
  },
  head: {}
})

// export default Vue.extend({
//   layout: 'page',
//   data () {
//     return {
//       categories: [],
//       message: {
//         error: ''
//       }
//     } as DataType
//   },
//   head () {
//     return {
//       title: 'サイトマップ'
//     }
//   },
//   created () {
//     this.init()
//   },
//   methods: {
//     init () {
//       const categories: Category[] = this.storeGetCategories()
//       try {
//         categories.forEach(async (category: Category) => {
//           category.posts = await apiGetSitemapPosts(category)
//           this.categories.push(category)
//         })
//       } catch (error) {
//         this.message.error = error
//       }
//     },
//     clickPostLink (post: Post) {
//       const current_category = this.categories.find(v => v.id === post.categories[0])
//       this.$pageMovePost(current_category, post, this.storeGetCategories())
//     }
//   }
// })
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
