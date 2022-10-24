function formatCategories (categories) {
  this.storeSetCategories(categories)
  const items = []
  categories.forEach((item) => {
    if (item.parent === 0) {
      item.sub_categories = categories.filter(v => v.parent === item.id)
    }
    items.push(item)
  })
  return items.filter(v => v.parent === 0)
}

function _pageMovePost (current_category, post, categories) {
  let parent_category = null
  if (current_category.parent !== 0) {
    parent_category = categories.find(r => r.id === current_category.parent)
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ app }, inject) => {
  inject('formatCategories', formatCategories)
  inject('_pageMovePost', _pageMovePost)
}
