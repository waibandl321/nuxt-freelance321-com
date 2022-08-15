import Vue from 'vue'

Vue.mixin({
  methods: {
    // カテゴリ
    storeSetCategories (categories) {
      this.$store.dispatch('storeSetCategoryItems', this.copyJson(categories))
    },
    storeGetCategories () {
      return this.$store.state.category_items
    },

    // フォーム
    storeSetContactForm (form_data) {
      this.$store.dispatch('storeSetForm', this.copyJson(form_data))
    },
    storeDeleteContactForm (form_data = null) {
      this.$store.dispatch('storeDeleteForm', form_data)
    },
    storeGetContactForm () {
      return this.$store.state.form
    }
  }
})
