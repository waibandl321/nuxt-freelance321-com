<template>
  <v-breadcrumbs
    :items="breadcrumbs"
    class="px-0 pt-0"
  >
    <template #item="{ item }">
      <v-breadcrumbs-item
        class="post-breadcrumb-item primary--text"
        :disabled="item.disabled"
        @click="clickBreadcrumbs(item)"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'PostBreadcrumbs',
  props: {
    post: Object
  },
  data () {
    return {
      breadcrumbs: []
    }
  },
  created () {
    this.initBreadcrumb()
  },
  methods: {
    initBreadcrumb () {
      const categories = this.storeGetCategories()
      const results = []
      const post = {}
      const category = {}
      const sub_category = {}
      post.text = this.post.title.rendered
      post.disabled = true
      if (this.$route.params.category) {
        const _category = categories.find(v => v.slug === this.$route.params.category)
        category.text = _category.name
        category.disabled = false
        category.obj = _category
        results.push(category)
        if (this.$route.params.subCategory) {
          // サブカテゴリあり
          const _sub_category = categories.find(v => v.slug === this.$route.params.subCategory)
          sub_category.text = _sub_category.name
          sub_category.disabled = false
          sub_category.obj = _sub_category
          results.push(sub_category)
        }
      }
      results.push(post)
      this.breadcrumbs = results
    },
    clickBreadcrumbs (item) {
      this.pageMoveCategory(item.obj)
    }
  }
}
</script>

<style scoped>
.post-breadcrumb-item >>> .v-breadcrumbs__item:hover {
  cursor: pointer;
}
.post-breadcrumb-item >>> .v-breadcrumbs__item.v-breadcrumbs__item--disabled:hover {
  cursor: initial;
}
</style>
