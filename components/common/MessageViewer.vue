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
<script>

export default {
  name: 'MessageViewer',
  props: {
    message: Object,
  }
}
</script>