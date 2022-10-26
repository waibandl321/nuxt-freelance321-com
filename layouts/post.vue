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

<script>
import { isWpApi } from '~/api/api'
export default {
  name: 'PostLayout',
  data () {
    return {
      categoryList: []
    }
  },
  async fetch () {
    this.categoryList = await this.apiGetCategories(isWpApi)
      .then((response) => {
        return response.data.filter(v => v.id !== 14 && v.id !== 1)
      })
    this.categoryList = this.$formatCategories(this.categoryList)
  }
}
</script>

<style scoped>
.v-application--wrap .container {
  padding-bottom: 100px;
  min-height: calc(100vh - 136px)!important;
  position: relative;
  margin-top: 76px;
}
</style>
