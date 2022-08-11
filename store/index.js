export const state = () => ({
  // 投稿
  post_view: {},
  // カテゴリー
  category_items: [],
  category_view: {}
})
export const mutations = {
  SET_POST_VIEW (state, post) {
    state.post_view = post
  },
  DELETE_POST_VIEW (state) {
    state.post_view = {}
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
    state.category_view = {}
  }
}
export const actions = {
  storeSetPostView (context, post) {
    context.commit('SET_POST_VIEW', post)
  },
  storeDeletePostView (context, post = {}) {
    context.commit('DELETE_POST_VIEW', post)
  },
  // カテゴリー
  storeSetCategoryItems (context, data) {
    context.commit('SET_CATEGORY_ITEMS', data)
  },
  deleteCategoryItems (context, data = []) {
    context.commit('DELETE_CATEGORY_ITEMS', data)
  },
  storeSetCategoryView (context, category) {
    context.commit('SET_CATEGORY_VIEW', category)
  },
  deleteCategoryView (context, category = {}) {
    context.commit('DELETE_CATEGORY_VIEW', category)
  }
}
export const getters = {
  storeGetPostView: state => state.post_view,
  storeGetCategoryItems: state => state.category_items
}
