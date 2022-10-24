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

function formatDate (data, format = 'YYYY-MM-dd') {
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
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ app }, inject) => {
  inject('formatCategories', formatCategories)
  inject('formatDate', formatDate)
  inject('_pageMovePost', _pageMovePost)
}
