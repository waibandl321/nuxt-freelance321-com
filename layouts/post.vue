<template>
  <v-app>
    <CommonHeader :category-list="navCategoryList" />
    <v-container>
      <v-row>
        <v-col cols="3" class="d-none d-sm-block">
          <CategorySideBar :category-list="navCategoryList" />
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
import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
import { readNavCategories } from '~/utils/utils'
import type { Category } from '~/types/'

export default defineComponent({
  setup () {
    const navCategoryList = ref<Category[]>([])
    useFetch(async () => {
      navCategoryList.value = await readNavCategories()
    })

    return {
      navCategoryList
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
