<template>
  <v-list>
    <div
      v-for="(category, idx) in categories"
      :key="idx"
    >
      <v-list-item
        @click="clickSideMenu(category)"
        dense
      >
        <v-list-item-title>{{ category.name }}</v-list-item-title>
      </v-list-item>
      <div
        v-show="category.sub_category"
        class="second"
      >
        <v-list-item
          v-for="(sub, idx2) in category.sub_category"
          :key="idx2"
          @click="clickSideMenu(sub)"
          dense
        >
          <v-list-item-title>{{ sub.name }}</v-list-item-title>
        </v-list-item>
      </div>
    </div>
  </v-list>
</template>
<script>
export default {
  name: 'CategorySideBar',
  data () {
    return {
      categories: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const results = this.$store.state.category_items.filter(v => v.id !== 1)
      // サブカテゴリマージ
      const items = []
      results.forEach((item) => {
        if (item.parent === 0) {
          item.sub_category = results.filter(v => v.parent === item.id)
        }
        items.push(item)
      })
      this.categories = items.filter(v => v.parent === 0)
    },
    clickSideMenu (category) {
      this.$store.dispatch('storeSetCategoryView', this.copyJson(category))
      this.pageMoveCategory(category)
    }
  }
}
</script>
<style scoped>
.second {
  padding-left: 16px;
}
</style>
