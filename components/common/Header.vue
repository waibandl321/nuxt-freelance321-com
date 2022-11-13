<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar app flat>
    <v-container class="fill-height pa-0">
      <div class="menu-wrap">
        <div>
          <v-btn
            text
            to="/"
            nuxt
          >
            TOP
          </v-btn>
        </div>
        <!-- カテゴリ -->
        <div class="p-relative">
          <v-btn
            class="first"
            text
          >
            カテゴリー
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <div class="second">
            <div
              v-for="(category, index) in categoryList"
              :key="index"
              class="menu-item p-relative"
              @click.stop="handleClickCategory(category)"
            >
              <div class="d-flex justify-space-between">
                <span>{{ category.name }}</span>
                <v-icon
                  v-if="category.sub_categories && category.sub_categories.length > 0"
                >
                  mdi-chevron-right
                </v-icon>
              </div>
              <div
                v-if="category.sub_categories && category.sub_categories.length > 0"
                class="third"
              >
                <div
                  v-for="(sub, index) in category.sub_categories"
                  :key="index"
                  class="menu-item p-relative"
                  @click.stop="handleClickCategory(sub)"
                >
                  {{ sub.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-spacer />
      <!-- 検索 -->
      <SearchBlock />
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { PropType } from 'vue'
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
    const router = useRouter()
    const handleClickCategory = (category: Category) => {
      useMoveCategory(router, category)
    }
    return {
      handleClickCategory
    }
  }
})
</script>

<style scoped>
.p-relative {
  position: relative;
}
.menu-wrap {
  display: flex;
}
.first:hover + .second {
  display: block;
}
.second,
.third {
  width: 220px;
  display: none;
  position: absolute;
  background: #fff;
  z-index: 2;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.second:hover {
  display: block;
}
.menu-item {
  padding: 8px 16px;
  font-size: 13px;
}
.menu-item:hover {
  background: #f8f5f5;
  cursor: pointer;
}
.second .menu-item:hover .third {
  display: block;
}
.third {
  left: 100%;
  top: 0;
}
.search {
  position: relative;
}
.search-result {
  font-size: 12px;
  width: 150%;
  position: absolute;
  top: 100%;
  right: 0;
  min-height: 200px;
  max-height: 500px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
