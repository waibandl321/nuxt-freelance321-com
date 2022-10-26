import Vue from 'vue'
import type { Category } from '@/types/page'

Vue.mixin({
  methods: {
    storeSetCategories (categories: Array<Category>):void {
      this.$store.dispatch('storeSetCategoryItems', categories)
    },
    storeGetCategories () : Array<Category> {
      return this.$store.state.category_items
    }
  }
})
