<!-- eslint-disable eqeqeq -->
<template>
  <v-app-bar
    app
    flat
  >
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
              v-for="(category, index) in header_links.categories"
              :key="index"
              class="menu-item p-relative"
              @click.stop="clickCategoryMenu(category)"
            >
              <div class="d-flex justify-space-between">
                <span>{{ category.name }}</span>
                <v-icon
                  v-show="category.sub_categories.length > 0"
                >
                  mdi-chevron-right
                </v-icon>
              </div>
              <div
                v-show="category.sub_categories.length > 0"
                class="third"
              >
                <div
                  v-for="(sub, index) in category.sub_categories"
                  :key="index"
                  class="menu-item p-relative"
                  @click.stop="clickCategoryMenu(sub)"
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
      <div class="search d-none d-sm-block">
        <v-responsive max-width="260">
          <v-text-field
            v-model.trim="search_query"
            dense
            flat
            hide-details
            rounded
            solo
            placeholder="記事検索"
            append-icon="mdi-magnify"
            @input="search()"
          />
        </v-responsive>
        <!-- 検索結果？ -->
        <div
          v-if="search_items.length > 0"
          class="search-result"
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
      categories: []
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
      this.categories = await this.apiGetAllCategories(
        this.apiTypeDefault()
      ).then((response) => {
        return response.data.filter(v => v.id !== 14 && v.id !== 1)
      })
      // storeにカテゴリーデータを格納
      this.storeSetCategories(this.categories)
      // サブカテゴリーマージ
      const items = []
      this.categories.forEach((item) => {
        if (item.parent === 0) {
          item.sub_categories = this.categories.filter(v => v.parent === item.id)
        }
        items.push(item)
      })
      this.header_links.categories = items.filter(v => v.parent === 0)
    } catch {}
  },
  methods: {
    clickCategoryMenu (category) {
      this.pageMoveCategory(category)
    },
    async search () {
      if (!this.search_query) {
        this.search_items = []
        return
      }
      this.search_loading = true
      try {
        this.search_items = await this.apiGetPostsSearch(
          this.search_query,
          this.apiCustomType()
        ).then((response) => {
          return response.data
        })
      } catch {}
      this.search_loading = false
    },
    clickSearchItem (post) {
      this.search_items = []
      this.search_query = ''
      this.search_loading = false

      const current_category = this.categories.find(v => v.id === post.category.term_id)
      this.pageMovePost(current_category, post)
    }
  }
}
</script>
<style scoped>
/* stylelint-disable */
/* .v-app-bar.v-app-bar--fixed {
  position: sticky;
} */
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
