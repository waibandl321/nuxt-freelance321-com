<template>
  <v-list>
    <div
      v-for="(category, idx) in categories"
      :key="idx"
    >
      <v-list-item
        @click="clickSideMenu(category)"
        dense
        :class="{ 'blue lighten-4': judgeActive(category) }"
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
          @click="clickSideMenu(sub)"
          dense
          :class="{ 'blue lighten-4': judgeActive(sub) }"
        >
          <v-list-item-title>{{ sub.name }}</v-list-item-title>
        </v-list-item>
      </div>
    </div>
  </v-list>
</template>
<script>
export default {
  name: 'CategorySideBar',
  data () {
    return {
      categories: []
    }
  },
  // TODO: パフォーマンス的にAPI呼び出しではなくStoreで対応したいが...
  // async fetch () {
  //   try {
  //     const ret = await this.apiGetAllCategories(
  //       this.apiTypeDefault()
  //     ).then((response) => {
  //       // 未分類カテゴリ除外
  //       return response.data.filter(v => v.id !== 1)
  //     })
  //     // サブカテゴリーマージ
  //     const items = []
  //     ret.forEach((item) => {
  //       if (item.parent === 0) {
  //         item.sub_categories = ret.filter(v => v.parent === item.id)
  //       }
  //       items.push(item)
  //     })
  //     this.categories = items.filter(v => v.parent === 0)
  //   } catch {}
  // },
  computed: {
    store_categories () {
      return this.storeGetCategories()
    }
  },
  created () {
    this.initCategories()
  },
  methods: {
    initCategories () {
      // サブカテゴリーマージ
      const items = []
      this.store_categories.forEach((item) => {
        if (item.parent === 0) {
          item.sub_categories = this.store_categories.filter(v => v.parent === item.id)
        }
        items.push(item)
      })
      this.categories = items.filter(v => v.parent === 0)
    },
    judgeActive (category) {
      return Number(category.id) === Number(this.$route.query.c)
    },
    clickSideMenu (category) {
      this.pageMoveCategory(category)
    }
  }
}
</script>
<style scoped>
.second {
  padding-left: 16px;
}
</style>
