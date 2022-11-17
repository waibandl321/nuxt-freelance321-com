<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar app flat>
    <v-container class="fill-height pa-0">
      <div class="header-menu">
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
            class="header-menu__first"
            text
          >
            カテゴリー
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <div class="header-menu__second">
            <div
              v-for="(category, index) in categoryList"
              :key="index"
              class="header-menu__item p-relative"
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
                class="header-menu__third"
              >
                <div
                  v-for="(sub, index) in category.sub_categories"
                  :key="index"
                  class="header-menu__item p-relative"
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

<style scoped lang="scss">
@import "assets/css/style.scss";
@mixin common-style() {
  width: 220px;
  display: none;
  position: absolute;
  background: $bg-white;
  z-index: 2;
  box-shadow: $box-shadow;
}
.header-menu {
  display: flex;
  &__first:hover + &__second {
    display: block;
  }
  &__second {
    @include common-style();
    &:hover {
      display: block;
    }
  }
  &__third {
    @include common-style();
    left: 100%;
    top: 0;
  }
  &__second &__item:hover &__third {
    display: block;
  }
  &__item {
    padding: 8px 16px;
    font-size: $font-size-default;
    &:hover {
      background: $bg-light-gray;
      cursor: pointer;
    }
  }
}
</style>
