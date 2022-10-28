import VueRouter from 'vue-router'
import type { Category, Post } from '@/types/page'
import { apiGetCategories } from '~/utils/api'

export function formatDate (data: string, format: string = 'YYYY-MM-dd'):string {
  if (!data) { return '' }
  const date_obj = new Date(data)
  const year = String(date_obj.getFullYear())
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

export function formatCategories (categories: Category[]): Category[] {
  const items: Category[] = []
  categories.forEach((item) => {
    if (item.parent === 0) {
      item.sub_categories = categories.filter(v => v.parent === item.id)
    }
    items.push(item)
  })
  return items.filter(v => v.parent === 0)
}

export async function readCategories (): Promise<Category[]> {
  const results: Category[] = await apiGetCategories()
    .then((response) => {
      return response.data.filter((v: Category) => v.id !== 14 && v.id !== 1)
    })
  return formatCategories(results)
}

export function pageMovePost (router: VueRouter, current_category: Category | undefined, post: Post) {
  if (current_category) {
    router.push(
      {
        path: '/' + current_category.slug + '/' + post.slug,
        query: { p: post.id }
      }
    )
  }
}

export function pageMoveCategory (router: VueRouter, category: Category | undefined) {
  if (category) {
    router.push(
      {
        path: '/' + category.slug,
        query: { c: category.id }
      }
    )
  }
}
