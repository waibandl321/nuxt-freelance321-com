<template>
  <ul>
    <li
      v-for="(category, idx) in categories"
      :key="idx"
    >
      <div>
        <v-btn
          @click="clickSideMenu(category)"
          text
        >
          {{ category.name }}
        </v-btn>
      </div>
      <ul
        v-show="category.sub_category"
        class="second"
      >
        <li
          v-for="(sub, idx2) in category.sub_category"
          :key="idx2"
        >
          <v-btn
            text
            @click="clickSideMenu(sub)"
          >{{ sub.name }}</v-btn>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'CategorySideBar',
  data () {
    return {
      categories: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const results = this.$store.state.category_items.filter(v => v.id !== 1)
      // 16 categories
      // TODO: 階層マージしたい
      const items = []
      results.forEach((item) => {
        if (item.parent === 0) {
          item.sub_category = results.filter(v => v.parent === item.id)
        }
        items.push(item)
      })
      this.categories = items.filter(v => v.parent === 0)
    },
    clickSideMenu (category) {
      this.$store.dispatch('setCategoryView', category)
      // if (category.parent !== 0) {
      //   const parent = this.categories.find(v => v.id === category.parent)
      //   this.$router.push(
      //     {
      //       path: '/' + parent.slug + '/' + category.slug,
      //       query: { c: category.id }
      //     }
      //   )
      //   return
      // }
      this.$router.push(
        {
          path: '/' + category.slug,
          query: { c: category.id }
        }
      )
    }
  }
}
</script>
<style scoped>
.second {
  padding-left: 16px;
}
</style>
