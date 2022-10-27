function pageMovePost (current_category, post, categories) {
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

function pageMoveCategory (category) {
  this.$router.push(
    {
      path: '/' + category.slug,
      query: { c: category.id }
    }
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ app }, inject) => {
  inject('pageMoveCategory', pageMoveCategory)
  inject('pageMovePost', pageMovePost)
}
