import Vue from 'vue'

Vue.mixin({
  methods: {
    copyJson (value) {
      return JSON.parse(JSON.stringify(value))
    },
    pageMoveCategory (category) {
      this.$router.push(
        {
          path: '/' + category.slug,
          query: { c: category.id }
        }
      )
    },
    pageMovePost (current_category, post) {
      let parent_category = null
      if (current_category.parent !== 0) {
        parent_category = this.categories.find(r => r.id === current_category.parent)
        this.$router.push(
          {
            path: '/' + parent_category.slug + '/' + current_category.slug + '/' + post.slug,
            query: { p: post.id }
          }
        )
        return
      }
      this.$router.push(
        {
          path: '/' + current_category.slug + '/' + post.slug,
          query: { p: post.id }
        }
      )
    }
  }
})
