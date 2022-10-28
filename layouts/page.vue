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
import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
import { readCategories } from '~/utils/utils'
import type { Category } from '@/types/page'

export default defineComponent({
  setup () {
    const categoryList = ref<Category[]>([])

    useFetch(async () => {
      categoryList.value = await readCategories()
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
