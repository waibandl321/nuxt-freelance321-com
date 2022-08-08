<template>
  <v-footer
      app
      color="transparent"
      height="72"
      inset
    >
      <v-container>
        <v-row>
          <v-col>
            リンク
          </v-col>
          <v-col>
            リンク
          </v-col>
          <v-col>
            リンク
          </v-col>
          <v-col>
            リンク
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
</template>
<script>

export default {
  name: 'FooterComponent',
}
</script>

<style scoped>
.v-footer--fixed {
  position: sticky;
}
</style>