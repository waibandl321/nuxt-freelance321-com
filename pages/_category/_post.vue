<template>
  <v-row>
    <v-col cols="3">
      <PostSideBar />
    </v-col>
    <v-col cols="6">
      <div>投稿日： {{ article.date }}</div>
      <v-card-title>{{ article.title.rendered }}</v-card-title>
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
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.article = this.$store.state.post_view
  }
}
</script>