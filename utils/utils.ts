import { useRouter } from '@nuxtjs/composition-api'
import type { Category, Post } from '@/types/page'

export function formatDate (data: string, format: string = 'YYYY-MM-dd'):string {
  if (!data) { return '' }
  const date_obj = new Date(data)
  const year = date_obj.getFullYear()
  const month = zeroPadding(date_obj.getMonth() + 1)
  const day = zeroPadding(date_obj.getDate())
  const hour = zeroPadding(date_obj.getHours())
  const minutes = zeroPadding(date_obj.getMinutes())
  const seconds = zeroPadding(date_obj.getSeconds())

  function zeroPadding (value: number) {
    return ('0' + value).slice(-2)
  }

  return format.replace('YYYY', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('hh', hour)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

export function formatCategories (categories: Category[]) {
  const items: [] = []
  categories.forEach((item) => {
    if (item.parent === 0) {
      item.sub_categories = categories.filter(v => v.parent === item.id)
    }
    items.push(item)
  })
  return items.filter(v => v.parent === 0)
}

export function pageMovePost (current_category: Category, post: Post, categories: Category[]) {
  const router = useRouter()
  let parent_category = null
  if (current_category.parent !== 0) {
    parent_category = categories.find(r => r.id === current_category.parent)
    if (parent_category) {
      router.push(
        {
          path: '/' + parent_category.slug + '/' + current_category.slug + '/' + post.slug,
          query: { p: post.id }
        }
      )
      return
    }
  }
  router.push(
    {
      path: '/' + current_category.slug + '/' + post.slug,
      query: { p: post.id }
    }
  )
}

export function pageMoveCategory (category: Category) {
  const router = useRouter()
  router.push(
    {
      path: '/' + category.slug,
      query: { c: category.id }
    }
  )
}
