<template>
  <div>
    <CommonLoadingPageInner v-if="loading" />
    <v-row v-else>
      <v-col cols="3" class="d-none d-sm-block">
        <CategorySideBar />
      </v-col>
      <v-col cols="12" sm="6">
        <!-- パンくず -->
        <PostBreadcrumbs :post="post" />
        <div class="post-wrap">
          <v-card-text class="pa-0">投稿日： {{ post.date }}</v-card-text>
          <v-card-title
            class="px-0 font-weight-bold"
          >
            {{ post.title.rendered || post.title }}
          </v-card-title>
          <CommonGoogleAds />
          <div
            v-html="render_html"
            class="post-content"
          ></div>
        </div>
      </v-col>
      <v-col cols="3" class="d-none d-sm-block">
        <PostTableOfContents :content="post.content.rendered || post.content" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import hljs from 'highlight.js'
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
        this.post.date = this.formatDate(this.post.date)
      })
    } else {
      // queryがない場合はparams.slugから詳細データを取得する（旧サイト対応）
      // eslint-disable-next-line no-lonely-if
      await this.apiGetPostFromSlug(
        this.$route.params.post,
        this.apiTypeDefault()
      ).then((res) => {
        this.post = res.data[0]
        this.post.date = this.formatDate(this.post.date)
      })
    }
    this.loading = false
  },
  head () {
    return {
      title: this.meta.title
    }
  },
  computed: {
    render_html () {
      const dom = document.createElement('div')
      const post = this.post.content.rendered || this.post.content
      dom.innerHTML = post
      dom.querySelectorAll('pre').forEach((element) => {
        const r = hljs.highlightAuto(element.textContent)
        const lang = element.getAttribute('data-lang')
        const code = element.querySelector('code')
        code.innerHTML = r.value
        code.classList.add('hljs')
        code.classList.add(lang)
        code.classList.add('language-' + lang)
        // 邪魔な属性を削除する
        const arrs = element.attributes
        const arr_obj = []
        for (const objAttrib of arrs) {
          arr_obj.push(objAttrib.name)
        }
        arr_obj.forEach((a) => {
          element.removeAttribute(a)
        })
      })
      return dom.outerHTML
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
