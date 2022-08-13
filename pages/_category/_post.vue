<template>
  <div>
    <CommonLoadingPageInner v-if="loading" />
    <v-row v-else>
      <v-col cols="3">
        <CategorySideBar />
      </v-col>
      <v-col cols="6">
        <div class="mt-6">投稿日： {{ article.date }}</div>
        <v-card-title
          class="px-0 font-weight-bold"
        >
          {{ article.title.rendered || article.title }}
        </v-card-title>
        <div
          v-html="article.content.rendered || article.content"
          class="post-content"
        ></div>
      </v-col>
      <v-col cols="3">
        <PostTableOfContents :content="article.content.rendered || article.content" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'PostPage',
  layout: 'post',
  data () {
    return {
      loading: false,
      article: {}
    }
  },
  async fetch () {
    this.loading = true
    if (this.$route.query.p) {
      await this.apiGetPostDetail(
        this.$route.query.p,
        this.apiTypeDefault()
      ).then((res) => {
        this.article = res.data
      })
    } else {
      // queryがない場合はparams.slugから詳細データを取得する（旧サイト対応）
      // eslint-disable-next-line no-lonely-if
      await this.apiGetPostFromSlug(
        this.$route.params.post,
        this.apiTypeDefault()
      ).then((res) => {
        this.article = res.data[0]
      })
    }
    this.loading = false
  }
}
</script>
