export const state = () => ({
  // カテゴリー
  category_items: [],
  category_view: {}
})
export const mutations = {
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
