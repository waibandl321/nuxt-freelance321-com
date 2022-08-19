<template>
  <v-footer
    app
    inset
  >
    <v-container class="px-0">
      <v-btn
        v-for="(link, idx) in footer_links.common"
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
<script>

export default {
  name: 'FooterComponent',
  data: () => ({
    footer_links: {
      common: [
        {
          text: 'プライバシーポリシー',
          to: '/privacy'
        },
        {
          text: 'お問い合わせ',
          to: '/contact'
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
    }
  })
}
</script>
