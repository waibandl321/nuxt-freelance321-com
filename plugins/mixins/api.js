import Vue from 'vue'
Vue.mixin({
  data () {
    return {
      api_conf: {
        base_path: 'https://admin.freelance321.com/wp-json/wp/v2/',
        custom_path: 'https://admin.freelance321.com/wp-json/wp/api/'
      },
      media: {
        media_base_url: 'https://admin.freelance321.com/wp-content/uploads/'
      }
    }
  },
  // 引数
  // custom_api: [false: wp api, true: custom api()]
  methods: {
    apiTypeDefault () {
      return false
    },
    apiCustomType () {
      return true
    },
    createApiBuildUrl (base_url, params) {
      return base_url + params
    },
    getApiBaseUrl (api_type) {
      return api_type ? this.api_conf.custom_path : this.api_conf.base_path
    },

    // 検索
    async apiGetPostsSearch (search_query, custom_api) {
      const base_url = this.getApiBaseUrl(custom_api)
      const params = 'search/' + search_query
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    // 全カテゴリ取得
    async apiGetAllCategories (custom_api) {
      const base_url = this.getApiBaseUrl(custom_api)
      const params = 'categories?per_page=50'
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    // 個別カテゴリ
    async apiGetCategoryFromId (cat_id, custom_api) {
      const base_url = this.getApiBaseUrl(custom_api)
      const params = 'categories/' + cat_id
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    async apiGetCategoryFromSlug (cat_slug, custom_api) {
      const base_url = this.getApiBaseUrl(custom_api)
      const params = 'categories?slug=' + cat_slug
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    // カテゴリ記事一覧取得（カテゴリーページ用）
    async apiGetCategoryPostList (category_id, current_page, per_page, custom_api) {
      const base_url = this.getApiBaseUrl(custom_api)
      const params = 'posts?categories=' +
                      category_id +
                      '&_embed' +
                      '&page=' + current_page +
                      '&per_page=' + per_page
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    // TOPページ用の記事一覧取得
    async apiGetPostList (current_page, per_page, custom_api) {
      const base_url = this.getApiBaseUrl(custom_api)
      const params = 'posts?_embed' +
                      '&page=' + current_page +
                      '&per_page=' + per_page
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    // カテゴリに紐付く全投稿データ取得（サイトマップ用）
    async apiGetPostsRelatedCategory (category, custom_api) {
      // TODO： 全投稿取得のapi必要
      const params = 'posts?categories=' + category.id + '&per_page=100'
      const base_url = this.getApiBaseUrl(custom_api)
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    // 記事詳細
    async apiGetPostDetail (post_id, custom_api) {
      const params = 'posts/' + post_id
      const base_url = this.getApiBaseUrl(custom_api)
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    // 記事詳細（スラッグから)
    async apiGetPostFromSlug (slug, custom_api) {
      const params = 'posts?slug=' + slug
      const base_url = this.getApiBaseUrl(custom_api)
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    // 固定ページ詳細取得
    async apiGetPageRelatedSlug (slug, custom_api) {
      const params = 'pages?slug=' + slug
      const base_url = this.getApiBaseUrl(custom_api)
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
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
