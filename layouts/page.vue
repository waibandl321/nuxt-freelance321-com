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

    useFetch(async () => {
      headerCategories.value = await readNavCategories()
    })

    return {
      headerCategories
    }
  }
})
</script>
