<template>
  <v-list>
    <v-list-item
      v-for="(post, index) in searchItems"
      :key="index"
      dense
      link
      nuxt
      @click="clickSearchItem(post)"
    >
      <v-list-item-content>
        <v-list-item-title>
          <div class="d-inline-block">
            {{ post.title }}
          </div>
          <v-list-item-subtitle>
            {{ post.category.name }}
          </v-list-item-subtitle>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    searchItems: {
      type: Array
    },
    clickSearchItem: {
      type: Function
    }
  }
}
</script>
