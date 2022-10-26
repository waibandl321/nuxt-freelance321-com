import Vue from 'vue'
import { getApiBaseUrl } from '~/api/api'
import type { Page, Post, SearchPost, Category } from '@/types/page'

Vue.mixin({
  methods: {
    async apiGetSearchPosts (search_query: string, api_type: string): Promise<SearchPost[]> {
      const base_url: string = getApiBaseUrl(api_type)
      const params: string = 'search/' + search_query
      return await this.callGetApi(base_url + params)
    },

    async apiGetPosts (current_page: number, per_page: number, api_type: string): Promise<Post[]> {
      const base_url: string = getApiBaseUrl(api_type)
      const params: string = 'posts?_embed' + '&page=' + current_page + '&per_page=' + per_page
      return await this.callGetApi(base_url + params)
    },

    async apiGetPostDetail (post_id, api_type: string): Promise<Post> {
      const params: string = 'posts/' + post_id + '?_embed'
      const base_url: string = getApiBaseUrl(api_type)
      return await this.callGetApi(base_url + params)
    },

    async apiGetCategories (api_type: string): Promise<Category[]> {
      const base_url: string = getApiBaseUrl(api_type)
      const params: string = 'categories?per_page=20'
      return await this.callGetApi(base_url + params)
    },

    async apiGetCategoryDetail (category_id, api_type: string): Promise<Category> {
      const base_url: string = getApiBaseUrl(api_type)
      const params: string = 'categories/' + category_id
      return await this.callGetApi(base_url + params)
    },

    async apiGetCategoryPosts (category_id, current_page: number, per_page: number, api_type: string): Promise<Post[]> {
      const base_url: string = getApiBaseUrl(api_type)
      const params: string = 'posts?categories=' + category_id + '&_embed' + '&page=' + current_page + '&per_page=' + per_page
      return await this.callGetApi(base_url + params)
    },
    async apiGetPageDetail (slug: string, api_type: string): Promise<Page> {
      const params: string = 'pages?slug=' + slug
      const base_url: string = getApiBaseUrl(api_type)
      return await this.callGetApi(base_url + params)
    },

    async apiGetSitemapPosts (category, api_type: string): Promise<Post[]> {
      const params: string = 'posts?categories=' + category.id + '&per_page=100'
      const base_url: string = getApiBaseUrl(api_type)
      return await this.callGetApi(base_url + params)
    },

    async callGetApi (buildPath: string) {
      console.log('call api:' + buildPath)
      return await this.$axios.get(buildPath, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
})
