<template>
  <v-app>
    <CommonHeader :category-list="categoryList" />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <CommonFooter />
  </v-app>
</template>

<script lang="ts">
import { useFetch, defineComponent, ref } from '@nuxtjs/composition-api'
import type { Category } from '@/types/'
import { readNavCategories } from '@/utils/utils'

export default defineComponent({
  setup () {
    const categoryList = ref<Category[]>([])
    // fetch
    useFetch(async () => {
      try {
        categoryList.value = await readNavCategories()
      } catch (error) {
        console.log(error)
      }
    })

    return {
      categoryList
    }
  }
})
</script>
