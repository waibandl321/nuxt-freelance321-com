import VueRouter from 'vue-router'
// import _cloneDeep from 'lodash/cloneDeep'
import { useFetchCategories } from '@/utils/api'
import type { Category, Post } from '@/types/'

export async function readNavCategories (): Promise<Category[]> {
  const response = await useFetchCategories()
  const results: Category[] = response.data.filter((v: Category) => v.id !== 14 && v.id !== 1)
  return formatCategories(results)
}

function formatCategories (categories: Category[]): Category[] {
  return categories.filter(v => v.parent === 0).map<Category>(item => ({
    sub_categories: categories.filter((v: Category) => v.parent === item.id),
    ...item
  }))
}

export function useRedirectNotFount (router: VueRouter) {
  router.push('/404NotFound')
}

export function usePageMovePost (router: VueRouter, current_category: Category, post: Post) {
  router.push(
    {
      path: '/' + current_category.slug + '/' + post.slug,
      query: { p: String(post.id) }
    }
  )
}

export function useMoveCategory (router: VueRouter, category: Category) {
  router.push(
    {
      path: '/' + category.slug,
      query: { c: String(category.id) }
    }
  )
}
