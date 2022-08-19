<template>
  <v-app>
    <CommonHeader />
    <v-container>
      <Nuxt />
    </v-container>
    <CommonFooter />
  </v-app>
</template>

<script>
export default {
  name: 'PageLayout',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.container {
  padding-bottom: 100px;
  min-height: calc(100vh - 136px);
  position: relative;
  margin-top: 76px;
}
</style>
