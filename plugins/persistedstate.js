import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'freelance321',
    paths: [
      'post_view',
      'category_items',
      'category_view'
    ]
  })(store)
}
