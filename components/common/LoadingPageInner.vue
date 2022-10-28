<template>
  <div class="loading-inner">
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </div>
</template>

<style scoped>
.loading-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
