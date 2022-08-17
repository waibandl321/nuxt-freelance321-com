import Vue from 'vue'

Vue.mixin({
  methods: {
    copyJson (value) {
      return JSON.parse(JSON.stringify(value))
    },
    formatDate (data, format = 'YYYY/MM/dd') {
      if (!data) { return }
      const date_obj = new Date(data)
      const year = date_obj.getFullYear()
      const month = zeroPadding(date_obj.getMonth() + 1)
      const day = zeroPadding(date_obj.getDate())
      const hour = zeroPadding(date_obj.getHours())
      const minutes = zeroPadding(date_obj.getMinutes())
      const seconds = zeroPadding(date_obj.getSeconds())
      function zeroPadding (value) {
        return ('0' + value).slice(-2)
      }
      return format.replace('YYYY', year)
        .replace('MM', month)
        .replace('dd', day)
        .replace('hh', hour)
        .replace('mm', minutes)
        .replace('ss', seconds)
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
