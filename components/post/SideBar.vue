<template>
  <v-list>
    <v-list-item
      v-for="n in 5"
      :key="n"
      link
      dense
    >
      <v-list-item-content>
        <v-list-item-title>Item {{ n }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>

export default {
  name: 'PostLeftNav'
}
</script>
