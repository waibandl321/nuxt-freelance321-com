import Vue from 'vue'
import { WP_API_PATH, CUSTOM_API_PATH } from '@/config/blog'

Vue.mixin({
  methods: {
    isWpApi () {
      return 'wp'
    },
    isCustomApi () {
      return 'custom'
    },
    getApiBaseUrl (api_type) {
      return api_type === 'wp' ? WP_API_PATH : CUSTOM_API_PATH
    },

    // 検索
    async apiGetPostsSearch (search_query, api_type) {
      const base_url = this.getApiBaseUrl(api_type)
      const params = 'search/' + search_query
      return await this.callGetApi(
        base_url + params
      )
    },
    // 全カテゴリ取得
    async apiGetCategories (api_type) {
      const base_url = this.getApiBaseUrl(api_type)
      const params = 'categories?per_page=20'
      return await this.callGetApi(
        base_url + params
      )
    },
    // 個別カテゴリ
    async apiGetCategoryFromId (cat_id, api_type) {
      const base_url = this.getApiBaseUrl(api_type)
      const params = 'categories/' + cat_id
      return await this.callGetApi(
        base_url + params
      )
    },
    async apiGetCategoryFromSlug (cat_slug, api_type) {
      const base_url = this.getApiBaseUrl(api_type)
      const params = 'categories?slug=' + cat_slug
      return await this.callGetApi(
        base_url + params
      )
    },
    // カテゴリ記事一覧取得（カテゴリーページ用）
    async apiGetCategoryPostList (category_id, current_page, per_page, api_type) {
      const base_url = this.getApiBaseUrl(api_type)
      const params = 'posts?categories=' +
                      category_id +
                      '&_embed' +
                      '&page=' + current_page +
                      '&per_page=' + per_page
      return await this.callGetApi(
        base_url + params
      )
    },
    // TOPページ用の記事一覧取得
    async apiGetPostList (current_page, per_page, api_type) {
      const base_url = this.getApiBaseUrl(api_type)
      const params = 'posts?_embed' +
                      '&page=' + current_page +
                      '&per_page=' + per_page
      return await this.callGetApi(
        base_url + params
      )
    },
    // カテゴリに紐付く全投稿データ取得（サイトマップ用）
    async apiGetPostsRelatedCategory (category, api_type) {
      // TODO： 全投稿取得のapi必要
      const params = 'posts?categories=' + category.id + '&per_page=100'
      const base_url = this.getApiBaseUrl(api_type)
      return await this.callGetApi(
        base_url + params
      )
    },
    // 記事詳細
    async apiGetPostDetail (post_id, api_type) {
      const params = 'posts/' + post_id + '?_embed'
      const base_url = this.getApiBaseUrl(api_type)
      return await this.callGetApi(
        base_url + params
      )
    },
    // 記事詳細（スラッグから)
    async apiGetPostFromSlug (slug, api_type) {
      const params = 'posts?slug=' + slug
      const base_url = this.getApiBaseUrl(api_type)
      return await this.callGetApi(
        base_url + params
      )
    },
    // 固定ページ詳細取得
    async apiGetPageRelatedSlug (slug, api_type) {
      const params = 'pages?slug=' + slug
      const base_url = this.getApiBaseUrl(api_type)
      return await this.callGetApi(
        base_url + params
      )
    },
    // API呼び出し共通処理
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
