<template>
  <v-app>
    <CommonHeader :category-list="navCategoryList" />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="3" class="d-none d-sm-block">
            <CategorySideBar :category-list="navCategoryList" />
          </v-col>
          <v-col cols="12" sm="9">
            <CommonMessageViewer :message="state.message" />
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <CommonFooter />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useFetch } from '@nuxtjs/composition-api'
import { readNavCategories } from '~/utils/utils'
import type { Category } from '~/types/'

export default defineComponent({
  setup () {
    const navCategoryList = ref<Category[]>([])
    const state = reactive({
      message: {
        error: '' as string
      }
    })
    useFetch(async () => {
      try {
        navCategoryList.value = await readNavCategories()
      } catch (err) {
        state.message.error = 'データの読み込みに失敗しました。'
      }
    })

    return {
      state,
      navCategoryList
    }
  }
})
</script>
