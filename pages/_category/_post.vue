<template>
  <div>
    <CommonLoadingPageInner v-if="loading" />
    <v-row v-else>
      <v-col cols="3">
        <CategorySideBar />
      </v-col>
      <v-col cols="6">
        <!-- パンくず -->
        <PostBreadcrumbs :post="post" />
        <div class="post-wrap">
          <div>投稿日： {{ post.date }}</div>
          <v-card-title
            class="px-0 font-weight-bold"
          >
            {{ post.title.rendered || post.title }}
          </v-card-title>
          <div
            v-html="post.content.rendered || post.content"
            class="post-content"
          ></div>
        </div>
      </v-col>
      <v-col cols="3">
        <PostTableOfContents :content="post.content.rendered || post.content" />
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
      post: {},
      meta: {
        title: ''
      }
    }
  },
  async fetch () {
    this.loading = true
    if (this.$route.query.p) {
      await this.apiGetPostDetail(
        this.$route.query.p,
        this.apiTypeDefault()
      ).then((res) => {
        this.post = res.data
      })
    } else {
      // queryがない場合はparams.slugから詳細データを取得する（旧サイト対応）
      // eslint-disable-next-line no-lonely-if
      await this.apiGetPostFromSlug(
        this.$route.params.post,
        this.apiTypeDefault()
      ).then((res) => {
        this.post = res.data[0]
      })
    }
    this.loading = false
  },
  head () {
    return {
      title: this.meta.title
    }
  },
  watch: {
    // MEMO: 非同期処理で投稿取得するため、取得状況を監視してmeta titleに割り当てる
    post (newValue) {
      this.meta.title = newValue.title.rendered
    }
  }
}
</script>
