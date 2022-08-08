<!-- eslint-disable eqeqeq -->
<template>
  <v-app-bar
    app
    color="white"
    flat
  >
    <v-container class="fill-height">
      <v-btn
        v-for="(link, idx) in header_links.common"
        :key="idx"
        :to="link.to"
        text
        nuxt
      >
        {{ link.text }}
      </v-btn>
      <div class="menu-wrap">
        <div class="menu-first">
          カテゴリー
          <v-icon>mdi-chevron-down</v-icon>
        </div>
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
      <v-spacer></v-spacer>
      <v-responsive max-width="260">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo
          append-icon="mdi-magnify"
        ></v-text-field>
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
      category_base_url: 'https://freelance321.com/wp-json/wp/v2/categories',

      common: [
        {
          text: 'TOP',
          to: '/'
        },
        {
          text: 'プライバシーポリシー',
          to: '/privacy'
        },
        {
          text: 'お問い合わせ',
          to: '/contact'
        },
        {
          text: 'サイトマップ',
          to: '/sitemap'
        },
        {
          text: 'プロフィール',
          to: '/profile'
        }
      ]
    }
  }),
  async fetch () {
    const res = await this.$axios.get(
      'https://freelance321.com/wp-json/wp/v2/categories?per_page=100'
    )
    const items = []
    const results = res.data
    results.forEach((item) => {
      items.push(item)
    })
    this.header_links.categories = items
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
      this.$router.push(category.slug)
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
  position: relative;
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
