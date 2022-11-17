<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-footer app inset class="footer">
    <v-container class="pa-0">
      <v-btn
        v-for="(link, idx) in footer_links"
        :key="idx"
        :to="link.to"
        text
        nuxt
      >
        {{ link.text }}
      </v-btn>
    </v-container>
  </v-footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const footer_links = [
      {
        text: 'プライバシーポリシー',
        to: '/privacy'
      },
      {
        text: 'サイトマップ',
        to: '/sitemap'
      },
      {
        text: 'プロフィール',
        to: '/profile'
      }
    ]
    return {
      footer_links
    }
  }
})
</script>
<style scoped lang="scss">
@import "assets/css/style.scss";
.footer {
  height: $footer-height;
}
</style>
