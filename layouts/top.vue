<template>
  <v-app>
    <CommonHeader :category-list="categoryList" />
    <v-container>
      <Nuxt />
    </v-container>
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

<style scoped>
.container {
  padding-bottom: 100px;
  min-height: calc(100vh - 136px);
  position: relative;
  margin-top: 76px;
}
</style>
