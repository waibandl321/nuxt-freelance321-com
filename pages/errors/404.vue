<template>
  <v-container>
    <h1>Page Not Found</h1>
    <h2>お探しのページが見つかりません</h2>
    <p>
    URLに間違いないか確認し、再度アクセスを試してください。
    また、つながらない場合は時間をおいて再度アクセスしてください。
    </p>
    <v-btn to="/" nuxt>トップページへ</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>
