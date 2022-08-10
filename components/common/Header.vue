<!-- eslint-disable eqeqeq -->
<template>
  <v-app-bar
    app
    color="white"
    flat
  >
    <v-container class="fill-height">
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
        <div class="p-relative">
          <v-btn
            class="menu-first"
            text
          >
            カテゴリー
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <div class="menu-second">
            <div
              v-for="(category, index) in first_categories"
              :key="index"
              class="menu-item p-relative"
              @click.stop="clickCategoryMenu(category)"
            >
              <div>{{ category.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <v-spacer />
      <v-responsive max-width="260">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo
          append-icon="mdi-magnify"
        />
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>
<script>

export default {
  name: 'HeaderComponent',
  data: () => ({
    header_links: {
      categories: [],
      category_base_url: 'https://freelance321.com/wp-json/wp/v2/categories'
    }
  }),
  async fetch () {
    try {
      let response = await this.$axios.get(
        'https://freelance321.com/wp-json/wp/v2/categories?per_page=100'
      )
      response = response.data.filter(v => v.id !== 1)
      const items = []
      // storeにカテゴリーデータを格納
      this.$store.dispatch('setCategoryItems', response)
      response.forEach((item) => {
        items.push(item)
      })
      this.header_links.categories = items
    } catch {}
  },
  computed: {
    first_categories () {
      return this.header_links.categories.filter(v => v.parent === 0)
    }
  },
  methods: {
    clickCategoryMenu (category) {
      // storeにカテゴリー情報を格納する
      this.$store.dispatch('setCategoryView', category)
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
/* stylelint-disable */
.v-app-bar.v-app-bar--fixed {
  position: sticky;
}
.p-relative {
  position: relative;
}
.menu-wrap {
  display: flex;
  font-size: 14px;
}
.menu-first:hover + .menu-second {
  display: block;
}
.menu-second {
  width: 200px;
  display: none;
  position: absolute;
  padding: 16px;
  background: #fff;
  z-index: 2;
  box-shadow: 0 4px 8px #eee;
}
.menu-second:hover {
  display: block;
}
.menu-item {
  padding: 4px 8px;
}
.menu-item:hover {
  background: #f8f5f5;
  cursor: pointer;
}
</style>
