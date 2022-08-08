<template>
  <v-list>
    <v-list-item
      v-for="(category, n) in categories"
      :key="n"
      link
      dense
      @click="clickSideMenu(category)"
    >
      <v-list-item-content>
        <v-list-item-title>{{ category.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const results = this.$store.state.category_items.filter(v => v.id !== 1)
      // 16 categories
      // TODO: 階層マージしたい
      const items = []
      results.forEach((item) => {
        items.push(item)
      })
      this.categories = items
    },
    clickSideMenu (category) {
      // let slug = ''
      // if (category.parent !== 0) {
      //   const parent = this.categories.find(v => v.id === category.parent)
      //   slug = parent.slug + '/' + category.slug
      // } else {
      //   slug = category.slug
      // }
      this.$store.dispatch('setCategoryView', category)
      this.$router.push('/' + category.slug)
      this.$router.push({ path: '/' + category.slug, query: { c: category.id } })
    }
  }
}
</script>
