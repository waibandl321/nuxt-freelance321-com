<template>
  <v-app>
    <CommonHeader :category-list="categoryList" />
    <v-container>
      <Nuxt />
    </v-container>
    <CommonFooter />
  </v-app>
</template>

<script>
import { isWpApi, apiGetCategories } from '~/api/api'
import { categoryStore } from '@/utils/store'

export default {
  name: 'PageLayout',
  data () {
    return {
      categoryList: []
    }
  },
  async fetch () {
    this.categoryList = await apiGetCategories(isWpApi)
      .then((response) => {
        return response.data.filter(v => v.id !== 14 && v.id !== 1)
      })

    const useStore = categoryStore()
    useStore.setCategories(this.categoryList)
    this.categoryList = this.$formatCategories(this.categoryList)
  }
}
</script>

<style scoped>
.container {
  padding-bottom: 100px;
  min-height: calc(100vh - 136px);
  position: relative;
  margin-top: 76px;
}
</style>
