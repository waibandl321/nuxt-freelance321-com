<template>
  <v-row>
    <v-col cols="2">
      <CategorySideBar />
    </v-col>
    <v-col cols="7">
      <div>投稿日： {{ article.date }}</div>
      <v-card-title class="px-0">{{ article.title.rendered }}</v-card-title>
      <div v-html="article.content.rendered"></div>
    </v-col>
    <v-col cols="3">
      <PostTableOfContents :content="article.content.rendered"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PostPage',
  layout: 'post',
  data: () => ({
    article: {}
  }),
  created () {
    this.article = this.$store.state.post_view
  }
}
</script>
