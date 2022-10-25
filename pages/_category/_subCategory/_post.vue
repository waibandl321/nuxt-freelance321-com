<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <CommonLoadingPageInner v-if="loading" />
    <v-row v-else>
      <v-col cols="12" sm="9">
        <!-- パンくず -->
        <PostBreadcrumbs :post="post" />
        <!-- 投稿詳細 -->
        <div class="post-wrap">
          <v-card-text class="pa-0">
            投稿日： {{ post.date }}
          </v-card-text>
          <v-card-title
            class="px-0 font-weight-bold"
          >
            {{ post.title.rendered || post.title }}
          </v-card-title>
          <div
            class="post-content"
            v-html="render_html"
          />
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
import { isWpApi } from '@/api/api'
import PostBreadcrumbs from '@/components/post/PostBreadcrumbs.vue'

export default {
  name: 'PostPage',
  components: {
    PostBreadcrumbs
  },
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
    try {
      await this.apiGetPostDetail(this.$route.query.p, isWpApi)
        .then((res) => {
          this.post = res.data
          this.post.date = this.$formatDate(this.post.date)
        })
    } catch {}
    this.loading = false
  },
  head () {
    return {
      // 構造化データ
      __dangerouslyDisableSanitizers: ['script'],
      script: [{
        innerHTML: `{
          "@context": "http://schema.org",
          "@type": "Article",
          "author": "${this.post.author === 1 ? 'Jumpei Onishi' : 'user'}",
          "name": "${this.meta.title}"
          "datePublished": "${this.post.date}"
        }`,
        type: 'application/ld+json'
      }],
      title: this.meta.title
    }
  },
  computed: {
    render_html () {
      return this.createHtml()
    }
  },
  watch: {
    // MEMO: 非同期処理で投稿取得するため、取得状況を監視してmeta titleに割り当てる
    post (newValue) {
      this.meta.title = newValue.title.rendered
    }
  },
  methods: {
    createHtml () {
      const dom = document.createElement('div')
      const post = this.post.content.rendered || this.post.content
      dom.innerHTML = post
      try {
        dom.querySelectorAll('.hcb_wrap pre').forEach((element) => {
          const r = hljs.highlightAuto(element.textContent)
          const lang = element.getAttribute('data-lang')
          const code = element.querySelector('code')
          code.innerHTML = r.value
          code.classList.add('hljs', lang, 'language-' + lang)
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
      } catch {}
      return dom.outerHTML
    }
  }
}
</script>
