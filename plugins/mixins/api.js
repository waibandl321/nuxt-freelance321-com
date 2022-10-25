import Vue from 'vue'
import { getApiBaseUrl } from '@/api/api'

Vue.mixin({
  methods: {
    async apiGetSearchPosts (search_query, api_type) {
      const base_url = getApiBaseUrl(api_type)
      const params = 'search/' + search_query
      return await this.callGetApi(base_url + params)
    },

    async apiGetPosts (current_page, per_page, api_type) {
      const base_url = getApiBaseUrl(api_type)
      const params = 'posts?_embed' + '&page=' + current_page + '&per_page=' + per_page
      return await this.callGetApi(base_url + params)
    },

    async apiGetPostDetail (post_id, api_type) {
      const params = 'posts/' + post_id + '?_embed'
      const base_url = getApiBaseUrl(api_type)
      return await this.callGetApi(base_url + params)
    },

    async apiGetCategories (api_type) {
      const base_url = getApiBaseUrl(api_type)
      const params = 'categories?per_page=20'
      return await this.callGetApi(base_url + params)
    },

    async apiGetCategoryDetail (category_id, api_type) {
      const base_url = getApiBaseUrl(api_type)
      const params = 'categories/' + category_id
      return await this.callGetApi(base_url + params)
    },

    async apiGetCategoryPosts (category_id, current_page, per_page, api_type) {
      const base_url = getApiBaseUrl(api_type)
      const params = 'posts?categories=' + category_id + '&_embed' + '&page=' + current_page + '&per_page=' + per_page
      return await this.callGetApi(base_url + params)
    },
    async apiGetPageDetail (slug, api_type) {
      const params = 'pages?slug=' + slug
      const base_url = getApiBaseUrl(api_type)
      return await this.callGetApi(base_url + params)
    },

    async apiGetSitemapPosts (category, api_type) {
      // TODO： 全投稿取得のapi必要
      const params = 'posts?categories=' + category.id + '&per_page=100'
      const base_url = getApiBaseUrl(api_type)
      return await this.callGetApi(base_url + params)
    },

    async callGetApi (buildPath) {
      console.log('call api:' + buildPath)
      return await this.$axios.get(buildPath, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
})
