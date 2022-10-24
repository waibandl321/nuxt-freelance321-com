<template>
  <v-list class="side-menu">
    <div
      v-for="(category, idx) in categoryList"
      :key="idx"
    >
      <v-list-item
        dense
        :class="{ 'blue lighten-4': judgeActive(category) }"
        @click="clickSideMenu(category)"
      >
        <v-list-item-title>{{ category.name }}</v-list-item-title>
      </v-list-item>
      <div
        v-show="category.sub_categories"
        class="second"
      >
        <v-list-item
          v-for="(sub, idx2) in category.sub_categories"
          :key="idx2"
          dense
          :class="{ 'blue lighten-4': judgeActive(sub) }"
          @click="clickSideMenu(sub)"
        >
          <v-list-item-title>{{ sub.name }}</v-list-item-title>
        </v-list-item>
      </div>
    </div>
  </v-list>
</template>
<script>
export default {
  name: 'CategorySideBar',
  props: {
    categoryList: {
      type: Array
    }
  },
  methods: {
    judgeActive (category) {
      if (this.$route.query.c) {
        return Number(category.id) === Number(this.$route.query.c)
      } else if (!this.$route.params.subCategory) {
        return this.$route.params.category === category.slug
      } else {
        return this.$route.params.subCategory === category.slug
      }
    },
    clickSideMenu (category) {
      this.$pageMoveCategory(category)
    }
  }
}
</script>
<style scoped>
.side-menu {
  padding-top: 0;
  position: sticky;
  top: 76px;
  max-height: calc(100vh - 162px);
  overflow: auto;
}
.second {
  padding-left: 16px;
}
</style>
