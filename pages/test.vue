<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Test extends Vue {
  message: string = 'This is a message'
}
</script>