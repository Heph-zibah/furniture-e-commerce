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

<template>
  <router-link :to="{name:'HomeView'}" class="flex gap-[5px] items-center">
    <img :src="logoSrc" :alt="altText" class="w-[30px] md:w-[50px]"/>
    <h1 class="logo font-bold text-[24px] md:text-[34px] text-[#000000]">Furniro</h1>
  </router-link>
</template>


