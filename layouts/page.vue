<template>
  <v-app>
    <CommonHeader :category-list="headerCategories" />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <CommonFooter />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
import { readNavCategories } from '~/utils/utils'
import type { Category } from '@/types/'

export default defineComponent({
  setup () {
    const headerCategories = ref<Category[]>([])
    const loading = ref(true)

    useFetch(async () => {
      try {
        await readNavCategories().then((res) => {
          headerCategories.value = res
        })
      } catch (error) {
        console.log(error)
      }
      loading.value = false
    })

    return {
      headerCategories,
      loading
    }
  }
})
</script>
