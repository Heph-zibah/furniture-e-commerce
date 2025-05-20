<script setup>
import { defineProps, defineEmits } from 'vue';
import ButtonComponent from '../custom/ButtonComponent.vue';
import LoadingComponent from '../custom/LoadingComponent.vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  isNotFound: {
    type: Boolean,
    default: false
  },
  loadingMessage: {
    type: String,
    default: 'Loading product details...'
  }
});

const emit = defineEmits(['goBack']);

const goBack = () => {
  emit('goBack');
};
</script>

<template>
  <!-- Loading State -->
  <LoadingComponent 
    v-if="isLoading" 
    :message="loadingMessage" 
    size="medium"
  />
  
  <!-- Not Found State -->
  <div v-else-if="isNotFound" class="py-16 text-center">
    <h1 class="text-2xl font-bold mb-4">Product Not Found</h1>
    <p class="mb-6">Sorry, we couldn't find the product you're looking for.</p>
    <button-component
      variant="blackOutlined"
      size="custom"
      padding="px-4 py-2"
      customClass="rounded-md outline-0"
      @click="goBack"
    >
      Go Back
    </button-component>
  </div>

  <!-- Default slot for content when not loading or not found -->
  <slot v-else></slot>
</template>