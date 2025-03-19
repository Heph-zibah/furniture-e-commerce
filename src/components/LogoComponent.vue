<template>
  <div class="logo-container">
    <img :src="logoSrc" :alt="altText"/>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  logoSrc: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: "Logo",
  },
});
</script>

<style scoped>

</style>
