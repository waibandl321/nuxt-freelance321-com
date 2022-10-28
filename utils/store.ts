import { reactive } from 'vue'
import { Category } from '~/types/page'
// import type { Category } from '@/types/page'

export function categoryStore () {
  interface State {
    categories: Category[] | null
  }

  const state = reactive({
    categories: null
  }) as State

  function setCategories (categories: Category[]): void {
    state.categories = categories
    console.log('state.categories', state.categories)
  }

  return {
    get categories () {
      return state.categories
    },
    setCategories
  }
}

export const useCounter = () => {
  const state = reactive({
    arr: []
  })

  function pushArr (arr: []) {
    state.arr = arr
  }

  return {
    state,
    get arr () {
      return state.arr
    },
    pushArr
  }
}
export type CategoryStore = ReturnType<typeof categoryStore>
export type CounterStore = ReturnType<typeof useCounter>;
