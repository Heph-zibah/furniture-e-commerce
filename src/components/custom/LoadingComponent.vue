<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: 'Loading...'
  },
  size: {
    type: String,
    default: 'medium' // 'small', 'medium', 'large'
  }
});

// Computed sizes for the spinner
const spinnerSize = {
  small: 'h-8 w-8',
  medium: 'h-12 w-12',
  large: 'h-16 w-16'
};

const textSize = {
  small: 'text-sm',
  medium: 'text-lg',
  large: 'text-xl'
};
</script>

<template>
  <div class="flex flex-col items-center justify-center py-8">
    <div 
      class="animate-spin rounded-full border-t-2 border-b-2 border-primary"
      :class="spinnerSize[size]"
    ></div>
    <p class="mt-4" :class="textSize[size]">{{ message }}</p>
  </div>
</template>