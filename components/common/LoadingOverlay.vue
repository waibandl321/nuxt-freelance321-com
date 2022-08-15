<template>
  <div class="loading-overlay">
    <v-progress-circular
      indeterminate
      color="white"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'LoadingPageInner'
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
</style>
