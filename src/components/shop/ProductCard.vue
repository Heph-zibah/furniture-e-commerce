<script setup>
import { defineProps, defineEmits } from 'vue';
import ButtonComponent from '../custom/ButtonComponent.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid',
    validator: (value) => ['grid', 'list'].includes(value)
  }
});

const emit = defineEmits(['add-to-cart']);

const addToCart = () => {
  emit('add-to-cart', props.product);
};
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};
</script>

<template>
  <!-- Grid View Product Card -->
  <router-link :to="`/shop/${product.id}/${createSlug(product.name)}`" v-if="viewMode === 'grid'" class="flex flex-col relative">
    <img 
      :src="product.images[0]" 
      :alt="product.name"
      class="w-full object-cover" 
    />
    <span :class="product.status === 'In Stock' ? 'bg-statusBg' : 'bg-tagBg'" 
          class="absolute right-2 top-2 rounded-lg text-white p-1 text-xs z-10">
      {{ product.status }}
    </span>
    <div class="bg-grayLightest p-4">
      <h3 class="text-[20px] font-semibold mb-2 line-clamp-1">{{ product.name }}</h3>
      <p class="text-charcoalGray font-medium">{{ product.category }}</p>
      <div class="flex justify-between items-center">
        <p class="text-[20px] font-semibold">{{ product.currency }} {{ product.discounted_price }}</p>
        <p class="text-[#B0B0B0] line-through">{{ product.currency }} {{ product.price }}</p>
      </div>
    </div>
    <div class="bg-black bg-opacity-70 absolute h-full w-full top-0 left-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-30">
      <ButtonComponent
        variant="secondary" 
        @click="addToCart"
        size="custom"
        width="w-fit"
        padding="px-[59px] py-3"
        fontSize="text-base"
        customClass="font-semibold"
      >
        Add to cart
      </ButtonComponent>
      <div class="flex items-center gap-5 mt-6">
        <div class="flex items-center gap-1 cursor-pointer text-white font-semibold">
          <img src="/public/images/share-white.svg" alt="Share">
          <span>Share</span>
        </div>
        <div class="flex items-center gap-1 cursor-pointer text-white font-semibold">
          <img src="/public/images/compare-white.svg" alt="Compare">
          <span>Compare</span>
        </div>
        <div class="flex items-center gap-1 cursor-pointer text-white font-semibold">
          <img src="/public/images/like-white.svg" alt="Like">
          <span>Like</span>
        </div>
      </div>
    </div>
  </router-link>

  <!-- List View Product Card -->
  <div v-else class="flex flex-col md:flex-row gap-6 bg-grayLightest p-4 rounded-lg relative">
    <div class="relative md:w-1/4">
      <img 
        :src="product.images[0]" 
        :alt="product.name"
        class="w-full object-cover h-48 md:h-full" 
      />
      <span :class="product.status === 'In Stock' ? 'bg-statusBg' : 'bg-tagBg'" 
            class="absolute right-2 top-2 rounded-lg text-white p-1 text-xs z-10">
        {{ product.status }}
      </span>
    </div>
    <div class="md:w-3/4 flex flex-col justify-between">
      <div>
        <h3 class="text-[20px] font-semibold mb-2">{{ product.name }}</h3>
        <p class="text-charcoalGray font-medium mb-4">{{ product.category }}</p>
        <p class="mb-4 text-grayMedium">
          {{ product.description || 'No description available for this product.' }}
        </p>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <p class="text-[20px] font-semibold">{{ product.currency }} {{ product.discounted_price }}</p>
          <p class="text-[#B0B0B0] line-through">{{ product.currency }} {{ product.price }}</p>
        </div>
        <div class="flex gap-4">
          <ButtonComponent
            variant="secondary" 
            @click="addToCart"
            size="custom"
            width="w-fit"
            padding="px-6 py-2"
            fontSize="text-base"
            customClass="font-semibold"
          >
            Add to cart
          </ButtonComponent>
          <div class="flex items-center gap-2 cursor-pointer">
            <img src="/public/images/share-white.svg" alt="Share" class="w-6 h-6">
          </div>
          <div class="flex items-center gap-2 cursor-pointer">
            <img src="/public/images/compare-white.svg" alt="Compare" class="w-6 h-6">
          </div>
          <div class="flex items-center gap-2 cursor-pointer">
            <img src="/public/images/like-white.svg" alt="Like" class="w-6 h-6">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>