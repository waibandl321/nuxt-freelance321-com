import Vue from 'vue'

Vue.mixin({
  data () {
    return {
      api: {
        base_path: 'https://freelance321.com/wp-json/wp/v2/',
        custom_path: 'https://freelance321.com/wp-json/wp/api/'
      }
    }
  },
  methods: {
    apiGetPostList () {},
    apiGetCategoryList () {},
    apiGetPage () {},
    callGetApi (call_type, params, api_type) {
      // call_type: posts, categories, page...
      // params: ?per_page=**&page=**?
      // api_type: wp api or custom api
      console.log(call_type)
      console.log(params)
      console.log(api_type)
    }
  }
})
