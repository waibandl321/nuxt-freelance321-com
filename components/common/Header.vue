<!-- eslint-disable eqeqeq -->
<template>
  <v-app-bar
    app
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
      <div class="search">
        <v-responsive max-width="260">
          <v-text-field
            v-model.trim="search_query"
            dense
            flat
            hide-details
            rounded
            solo
            append-icon="mdi-magnify"
            @input="search()"
          />
        </v-responsive>
        <!-- 検索結果？ -->
        <div
          class="search-result"
          v-if="search_items.length > 0"
        >
          <!-- 検索ローディング -->
          <loading-search v-if="search_loading" />
          <v-list v-else>
            <v-list-item
              v-for="(post, index) in search_items"
              :key="index"
              dense
              link
              nuxt
              @click="clickSearchItem(post)"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <div class="d-inline-block">{{ post.title }}</div>
                  <v-list-item-subtitle>
                    {{ post.category.name }}
                  </v-list-item-subtitle>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>
<script>
import LoadingPageInner from '@/components/common/LoadingPageInner.vue'
export default {
  name: 'HeaderComponent',
  components: {
    'loading-search': LoadingPageInner
  },
  data: () => ({
    header_links: {
      categories: [],
      category_base_url: 'https://freelance321.com/wp-json/wp/v2/categories'
    },
    // 検索
    search_api_path: 'https://freelance321.com/wp-json/wp/api/search/',
    search_query: '',
    search_items: [],
    search_loading: false,
    search_error: '',
    categories: []
  }),
  async fetch () {
    try {
      let response = await this.$axios.get(
        'https://freelance321.com/wp-json/wp/v2/categories?per_page=100'
      )
      response = response.data.filter(v => v.id !== 1)
      const items = []
      // storeにカテゴリーデータを格納
      this.$store.dispatch('storeSetCategoryItems', this.copyJson(response))
      this.categories = response
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
      this.$store.dispatch('storeSetCategoryView', this.copyJson(category))
      this.pageMoveCategory(category)
    },
    async search () {
      if (!this.search_query) {
        this.search_items = []
        return
      }
      this.search_items = []
      this.search_loading = true
      try {
        const results = await this.$axios.get(this.search_api_path + this.search_query)
        this.search_items = results.data
      } catch {}
      this.search_loading = false
    },
    clickSearchItem (post) {
      this.search_items = []
      this.search_query = ''
      this.search_loading = false
      this.$store.dispatch('storeSetPostView', this.copyJson(post))

      const category_id = post.category.term_id
      const current_category = this.categories.find(v => v.id === category_id)

      this.pageMovePost(current_category, post)
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
