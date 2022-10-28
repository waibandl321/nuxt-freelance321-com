import { reactive } from 'vue'
import { Category } from '~/types/page'

type State = {
  categories: Category[]
}

export const useCategoryStore = () => {
  const state = reactive({
    categories: []
  }) as State

  function setCategories (categories: []) {
    state.categories = categories
  }
  function getCategories () {
    return state.categories
  }

  return {
    get categories () {
      return state.categories
    },
    setCategories,
    getCategories
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
export type CategoryStore = ReturnType<typeof useCategoryStore>
export type CounterStore = ReturnType<typeof useCounter>
