import Vue from 'vue'
Vue.mixin({
  data () {
    return {
      api_conf: {
        base_path: 'https://freelance321.com/wp-json/wp/v2/',
        custom_path: 'https://freelance321.com/wp-json/wp/api/'
      }
    }
  },
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
    apiGetPostList () {},
    // カテゴリに紐付く全投稿データ取得
    async apiGetPostsRelatedCategory (category, custom_api) {
      // TODO： 全投稿取得のapi必要
      const params = 'posts?categories=' + category.id + '&per_page=100'
      const base_url = this.getApiBaseUrl(custom_api)
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    async apiGetPageRelatedSlug (slug, custom_api) {
      const params = 'pages?slug=' + slug
      const base_url = this.getApiBaseUrl(custom_api)
      return await this.callGetApi(
        this.createApiBuildUrl(base_url, params)
      )
    },
    async callGetApi (buildPath) {
      console.log(buildPath)
      return await this.$axios.get(buildPath, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
})
