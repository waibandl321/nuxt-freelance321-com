export default {
  state: {
    // 投稿
    // post_items: [],
    post_view: null,
    // カテゴリー
    category_items: [],
    category_view: null
  },
  mutations: {
    // 投稿
    // SET_POST_ITEMS (state, data) {
    //   state.post_items = data
    // },
    // DELETE_POST_ITEMS (state) {
    //   state.post_items = []
    // },
    SET_POST_VIEW (state, post) {
      state.post_view = post
    },
    DELETE_POST_VIEW (state) {
      state.post_view = null
    },
    // カテゴリー
    SET_CATEGORY_ITEMS (state, data) {
      state.category_items = data
    },
    DELETE_CATEGORY_ITEMS (state) {
      state.category_items = []
    },
    SET_CATEGORY_VIEW (state, post) {
      state.category_view = post
    },
    DELETE_CATEGORY_VIEW (state) {
      state.category_view = null
    }
  },
  actions: {
    // 投稿
    // setPostItems (context, data) {
    //   context.commit('SET_POST_ITEMS', data)
    // },
    // deletePostItems (context, data = []) {
    //   context.commit('DELETE_POST_ITEMS', data)
    // },
    setPostView (context, post) {
      context.commit('SET_POST_VIEW', post)
    },
    deletePostView (context, post = null) {
      context.commit('DELETE_POST_VIEW', post)
    },
    // カテゴリー
    setCategoryItems (context, data) {
      context.commit('SET_CATEGORY_ITEMS', data)
    },
    deleteCategoryItems (context, data = []) {
      context.commit('DELETE_CATEGORY_ITEMS', data)
    },
    setCategoryView (context, category) {
      context.commit('SET_CATEGORY_VIEW', category)
    },
    deleteCategoryView (context, category = null) {
      context.commit('DELETE_CATEGORY_VIEW', category)
    }
  }
}
