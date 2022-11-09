<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <CommonLoadingPageInner v-if="state.loading" />
    <v-row v-else>
      <v-col cols="12" sm="9">
        <!-- <PostBreadcrumbs :post="state.post" /> -->
        <div class="post-wrap">
          <v-card-text class="pa-0">
            投稿日： {{ $dayjs(state.post.date).format('YYYY/MM/DD') }}
          </v-card-text>
          <v-card-title
            class="px-0 font-weight-bold"
          >
            {{ state.post.title.rendered }}
          </v-card-title>
          <div
            class="post-content"
            v-html="createHtml()"
          />
        </div>
      </v-col>
      <v-col cols="3" class="d-none d-sm-block">
        <PostTableOfContents :content="state.post.content.rendered" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent, useFetch, reactive, useRoute } from '@nuxtjs/composition-api'
import hljs from 'highlight.js'
import { useFetchPost } from '@/utils/api'

export default defineComponent({
  layout: 'post',
  setup () {
    const state = reactive({
      loading: false,
      post: {},
      meta: {
        title: ''
      }
    })
    const route = useRoute()

    useFetch(async () => {
      state.loading = true
      try {
        await useFetchPost(route.value.query.p).then((res) => {
          state.post = res.data
        })
      } catch (error) {
        console.log(error)
      }
      state.loading = false
    })

    const createHtml = () => {
      const dom = document.createElement('div')
      dom.innerHTML = state.post.content.rendered
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

    return {
      createHtml,
      state,
      route
    }
  }
})
</script>
