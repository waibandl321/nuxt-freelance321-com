import Vue from 'vue'

Vue.mixin({
  methods: {
    storeSetCategories (categories) {
      this.$store.dispatch('storeSetCategoryItems', this.$copyJson(categories))
    },
    storeGetCategories () {
      return this.$store.state.category_items
    }
  }
})
