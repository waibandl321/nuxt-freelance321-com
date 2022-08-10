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
            class="first"
            text
          >
            カテゴリー
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <div class="second">
            <div
              v-for="(category, index) in first_categories"
              :key="index"
              class="menu-item p-relative"
              @click.stop="clickCategoryMenu(category)"
            >
              <div class="d-flex justify-space-between">
                <span>{{ category.name }}</span>
                <v-icon v-show="category.sub_categories.length > 0">mdi-chevron-right</v-icon>
              </div>
              <div
                v-show="category.sub_categories.length > 0"
                class="third"
              >
                <div
                  v-for="(sub, index) in category.sub_categories"
                  :key="index"
                  class="menu-item p-relative"
                  @click.stop="clickCategoryMenu(category)"
                >
                  {{ sub.name }}
                </div>
              </div>
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
        if (item.parent === 0) {
          item.sub_categories = response.filter(v => v.parent === item.id)
        }
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
</style>
