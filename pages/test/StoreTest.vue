<template>
  <div>
    カテゴリ
    <div>
      {{ arr }}
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useFetch } from '@nuxtjs/composition-api'
// import { computed, useFetch } from '@nuxtjs/composition-api'
import { useCounter } from '@/utils/store.ts'
import { readCategories } from '~/utils/utils'
// import { readCategories } from '@/utils/utils'
// import { Category } from '@/types/page'

export default defineComponent({
  setup () {
    const counter = useCounter()

    const arr = computed(() => counter.arr)

    useFetch(async () => {
      await readCategories().then((cats) => {
        counter.pushArr(cats)
      })
    })

    return {
      arr
    }
  }
})
</script>
