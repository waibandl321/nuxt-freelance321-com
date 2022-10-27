import { reactive, watch } from 'vue'
// import type { Category } from '@/types/page'

export function categoryStore () {
  const state = reactive({
    categories: null
  })

  watch(
    () => state.categories,
    (categories) => {
      state.categories = categories
    }
  )

  return {
    get categories () {
      // console.log('get categories', state.categories)
      return state.categories
    },
    setCategories (categories) {
      state.categories = categories
      // console.log('set categories', state.categories)
    }
  }
}

export default function counterStore () {
  const state = reactive({
    count: 0,
    arr: []
  })

  return {
    get count () {
      return state.count
    },

    get arr () {
      return state.arr
    },

    increment () {
      state.count += 1
    },
    decrement () {
      state.count -= 1
    },
    addArr () {
      const str = 'justis!'
      state.arr.push(str)
    }
  }
}

export type CounterStore = ReturnType<typeof counterStore>
export type CategoryStore = ReturnType<typeof categoryStore>
