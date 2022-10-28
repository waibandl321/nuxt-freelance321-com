<template>
  <div>
    <v-alert
      v-if="message.error"
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
    >
      {{ message.error }}
    </v-alert>
    <v-alert
      v-if="message.success"
      outlined
      type="success"
      text
    >
      {{ message.success }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type Message = {
  success: string;
  error: string;
}

export default defineComponent({
  props: {
    message: {
      type: Object as PropType<Message>,
      default: null
    }
  }
})
</script>
