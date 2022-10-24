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
    const categories = await this.apiGetAllCategories(this.apiTypeDefault())
      .then((response) => {
        return response.data.filter(v => v.id !== 14 && v.id !== 1)
      })
    // storeにカテゴリーデータを格納
    this.storeSetCategories(categories)
    // サブカテゴリーマージ
    const items = []
    categories.forEach((item) => {
      if (item.parent === 0) {
        item.sub_categories = categories.filter(v => v.parent === item.id)
      }
      items.push(item)
    })
    this.categoryList = items.filter(v => v.parent === 0)
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
