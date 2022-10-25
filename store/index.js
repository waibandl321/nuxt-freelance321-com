export const state = () => ({
  category_items: []
})
export const mutations = {
  SET_CATEGORY_ITEMS (state, data) {
    state.category_items = data
  }
}
export const actions = {
  storeSetCategoryItems (context, data) {
    context.commit('SET_CATEGORY_ITEMS', data)
  }
}
export const getters = {}
