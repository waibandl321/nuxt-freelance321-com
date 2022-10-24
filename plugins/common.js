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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ app }, inject) => {
  inject('formatCategories', formatCategories)
}
