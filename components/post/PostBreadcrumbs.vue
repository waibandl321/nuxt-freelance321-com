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
import { useRoute } from '@nuxtjs/composition-api'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  props: {
    post: {
      type: Object
    }
  },
  setup (props) {
    const route = useRoute()
    const breadcrumbs = ref([])

    function initBreadcrumb () {
      const results = []
      const post = {}
      const category = {}
      const sub_category = {}

      post.text = props.post.title.rendered
      post.disabled = true

      if (route.value.params.category) {
        const _category = categories.find(v => v.slug === route.value.params.category)
        category.text = _category.name
        category.disabled = false
        category.obj = _category
        results.push(category)
        if (route.value.params.subCategory) {
          // サブカテゴリあり
          const _sub_category = categories.find(v => v.slug === route.value.params.subCategory)
          sub_category.text = _sub_category.name
          sub_category.disabled = false
          sub_category.obj = _sub_category
          results.push(sub_category)
        }
      }
      results.push(post)
      breadcrumbs.value = results
    }

    onMounted(() => {
      initBreadcrumb()
    })

    const clickBreadcrumbs = (item) => {
      this.$useMoveCategory(item.obj)
    }

    return {
      breadcrumbs,
      clickBreadcrumbs
    }
  }
})
</script>

<style scoped>
.post-breadcrumb-item >>> .v-breadcrumbs__item:hover {
  cursor: pointer;
}
.post-breadcrumb-item >>> .v-breadcrumbs__item.v-breadcrumbs__item--disabled:hover {
  cursor: initial;
}
</style>
