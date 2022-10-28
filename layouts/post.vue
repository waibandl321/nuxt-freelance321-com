<template>
  <v-app>
    <CommonHeader :category-list="categoryList" />
    <v-container>
      <v-row>
        <v-col cols="3" class="d-none d-sm-block">
          <CategorySideBar :category-list="categoryList" />
        </v-col>
        <v-col cols="12" sm="9">
          <Nuxt />
        </v-col>
      </v-row>
    </v-container>
    <CommonFooter />
  </v-app>
</template>

<script lang="ts">
import { useFetch } from '@nuxtjs/composition-api'
import { defineComponent, ref } from 'vue'
import { readCategories } from '~/utils/utils'
import type { Category } from '~/types/page'

export default defineComponent({
  setup () {
    const categoryList = ref<Category[]>([])
    // fetch
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
.v-application--wrap .container {
  padding-bottom: 100px;
  min-height: calc(100vh - 136px)!important;
  position: relative;
  margin-top: 76px;
}
</style>
