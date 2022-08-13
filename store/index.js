export const state = () => ({
  // カテゴリー
  category_items: []
})
export const mutations = {
  // カテゴリー
  SET_CATEGORY_ITEMS (state, data) {
    state.category_items = data
  }
}
export const actions = {
  // カテゴリー
  storeSetCategoryItems (context, data) {
    context.commit('SET_CATEGORY_ITEMS', data)
  }
}
export const getters = {}
