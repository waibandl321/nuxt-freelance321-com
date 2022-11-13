<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <CommonMessageViewer :message="state.message" />
    <CommonLoadingPageInner v-if="!state.post" />
    <v-row v-else>
      <v-col cols="12" sm="9">
        <PostBreadcrumbs
          :post="state.post"
        />
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
            v-html="state.htmlContent"
          />
        </div>
      </v-col>
      <v-col cols="3" class="d-none d-sm-block">
        <PostTableOfContents :content="state.post.content.rendered" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, useFetch, reactive, useRoute } from '@nuxtjs/composition-api'
import hljs from 'highlight.js'
import { useFetchPost } from '@/utils/api'
import type { Post, AxiosResponsePostObject } from '@/types'

interface StateType {
  post: Post | undefined,
  meta: {
    title: string
  },
  message: {
    error: string
  },
  htmlContent: string
}

export default defineComponent({
  layout: 'post',
  setup () {
    const route = useRoute()
    const state = reactive<StateType>({
      post: undefined,
      meta: {
        title: ''
      },
      message: {
        error: ''
      },
      htmlContent: ''
    })

    useFetch(async () => {
      await useFetchPost(route.value.query.p).then((response: AxiosResponsePostObject) => {
        state.post = response.data
        state.htmlContent = shapingHtml(response.data)
      }).catch((err) => {
        state.message.error = '投稿データ取得エラー: ' + err
      })
    })

    function shapingHtml (post: Post): string {
      const dom: HTMLDivElement = document.createElement('div')
      dom.innerHTML = post.content.rendered
      const hcb_elements: NodeListOf<Element> = dom.querySelectorAll('.hcb_wrap pre')

      for (const element of Array.from(hcb_elements)) {
        const code: (HTMLElement | null) = element.querySelector('code')
        const lang: (string | null) = element.getAttribute('data-lang')
        if (!lang || !code || !element.textContent) {
          return dom.outerHTML
        }
        const result = hljs.highlightAuto(element.textContent)
        code.innerHTML = result.value
        code.classList.add('hljs', lang, 'language-' + lang)
      }
      return dom.outerHTML
    }

    return {
      state,
      route
    }
  }
})
</script>
