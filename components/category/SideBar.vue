<template>
  <v-list class="side-menu">
    <div
      v-for="(category, idx) in categoryList"
      :key="idx"
    >
      <v-list-item
        dense
        :class="{ 'blue lighten-4': judgeActive(category) }"
        @click="handleClickCategory(category)"
      >
        <v-list-item-title>{{ category.name }}</v-list-item-title>
      </v-list-item>
      <div
        v-show="category.sub_categories"
        class="second"
      >
        <v-list-item
          v-for="(sub, idx2) in category.sub_categories"
          :key="idx2"
          dense
          :class="{ 'blue lighten-4': judgeActive(sub) }"
          @click="handleClickCategory(sub)"
        >
          <v-list-item-title>{{ sub.name }}</v-list-item-title>
        </v-list-item>
      </div>
    </div>
  </v-list>
</template>

<script lang="ts">
import { useRoute, useRouter, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Category } from '~/types'
import { useMoveCategory } from '@/utils/utils'

export default defineComponent({
  props: {
    categoryList: {
      type: Array as PropType<Category[]>,
      required: true
    }
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    function judgeActive (category: Category): boolean {
      if (route.value.query.c) {
        return Number(category.id) === Number(route.value.query.c)
      } else if (!route.value.params.subCategory) {
        return route.value.params.category === category.slug
      } else {
        return route.value.params.subCategory === category.slug
      }
    }

    function handleClickCategory (category: Category): void {
      useMoveCategory(router, category)
    }

    return {
      judgeActive,
      handleClickCategory
    }
  }
})
</script>
<style scoped>
.side-menu {
  padding-top: 0;
  position: sticky;
  top: 76px;
  max-height: calc(100vh - 162px);
  overflow: auto;
}
.second {
  padding-left: 16px;
}
</style>
