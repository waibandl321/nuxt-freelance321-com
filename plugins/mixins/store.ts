import Vue from 'vue'
import type { Page, Category } from '@/types/page'

Vue.mixin({
  methods: {
    storeSetCategories (categories: Array<Category>):void {
      this.$store.dispatch('storeSetCategoryItems', this.$copyJson(categories))
    },
    storeGetCategories () : Array<Category> {
      return this.$store.state.category_items
    }
  }
})
