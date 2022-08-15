export const state = () => ({
  // カテゴリー
  category_items: [],
  // お問い合わせ
  form: {}
})
export const mutations = {
  // カテゴリー
  SET_CATEGORY_ITEMS (state, data) {
    state.category_items = data
  },
  // フォーム
  SET_CONTACT_FORM (state, form_data) {
    state.form = form_data
  }
}
export const actions = {
  // カテゴリー
  storeSetCategoryItems (context, data) {
    context.commit('SET_CATEGORY_ITEMS', data)
  },
  // フォーム
  storeSetForm (context, form_data) {
    context.commit('SET_CONTACT_FORM', form_data)
  },
  storeDeleteForm (context, form_data) {
    context.commit('SET_CONTACT_FORM', form_data)
  }
}
export const getters = {}
