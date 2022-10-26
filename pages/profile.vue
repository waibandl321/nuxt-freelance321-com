<template>
  <div>
    <CommonLoadingPageInner v-if="!page_data" />
    <div v-else>
      <v-card-title
        class="px-0 font-weight-bold"
      >
        {{ pageTitle }}
      </v-card-title>
      <div
        class="post-content"
        v-html="pageContent"
      />
    </div>
  </div>
</template>

<!-- <script lang="ts">
import Vue from 'vue'
import { isWpApi } from '@/api/api'
import type { Page } from '@/types/page'

export default Vue.extend({
  layout: 'page',
  // data (): { page_data: Page | null } {
  //   return {
  //     page_data: null
  //   }
  // },
  // async fetch () {
  //   this.page_data = await this.apiGetPageDetail(this.$route.name, isWpApi)
  // },
  head () {
    return {
      title: 'プロフィール'
    }
  },
  computed: {
    page_content (): string | undefined {
      return this.page_data?.data[0].content.rendered
    },
    page_title (): string | undefined {
      return this.page_data?.data[0].title.rendered
    }
  }
})
</script> -->

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { isWpApi } from '~/api/api'
import type { Page } from '@/types/page'

@Component({
  layout: 'page'
})
export default class Profile extends Vue {
  page_data: Page | null = null

  created () {
    this.getPage()
  }

  async getPage () : Promise<void> {
    this.page_data = await this.apiGetPageDetail(this.$route.name, isWpApi)
  }

  get pageContent () : string | undefined {
    return this.page_data?.data[0].content.rendered
  }

  get pageTitle () : string | undefined {
    return this.page_data?.data[0].title.rendered
  }
}
</script>
