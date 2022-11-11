import VueRouter from 'vue-router'
import _cloneDeep from 'lodash/cloneDeep'
import type { Category, Post } from '@/types/'
import { useFetchCategories } from '~/utils/api'

export async function readNavCategories (): Promise<Category[]> {
  const results: Category[] = await useFetchCategories()
    .then((response) => {
      return response.data.filter((v: Category) => v.id !== 14 && v.id !== 1)
    })
  return formatCategories(results)
}

function formatCategories (categories: Category[]): Category[] {
  // 引数を変数に置き換え
  const _categories = _cloneDeep(categories)
  const results: Category[] = []
  _categories.forEach((item: Category) => {
    if (item.parent === 0) {
      item.sub_categories = _categories.filter((v: Category) => v.parent === item.id)
    }
    results.push(item)
  })
  return results.filter(v => v.parent === 0)
}

export function useRedirectNotFount (router: VueRouter) {
  router.push('/404NotFound')
}

export function usePageMovePost (router: VueRouter, current_category: Category | undefined, post: Post) {
  if (current_category) {
    router.push(
      {
        path: '/' + current_category.slug + '/' + post.slug,
        query: { p: String(post.id) }
      }
    )
  }
}

export function useMoveCategory (router: VueRouter, category: Category | undefined) {
  if (category) {
    router.push(
      {
        path: '/' + category.slug,
        query: { c: String(category.id) }
      }
    )
  }
}
