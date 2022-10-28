import { reactive } from 'vue'
// import { Category } from '~/types/page'
// import type { Category } from '@/types/page'

export function categoryStore () {
  const state = reactive({
    categories: []
  })

  return {
    get categories () {
      // console.log('get categories', state.categories)
      return state.categories
    },
    setCategories (categories): void {
      state.categories = categories
      console.log('set categories', state.categories)
    }
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
