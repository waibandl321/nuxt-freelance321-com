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
export default {
  name: 'PageLayout',
  data () {
    return {
      categoryList: []
    }
  },
  async fetch () {
    this.categoryList = await this.apiGetCategories(this.apiTypeDefault())
      .then((response) => {
        return response.data.filter(v => v.id !== 14 && v.id !== 1)
      })
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
