<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import ButtonComponent from '../custom/ButtonComponent.vue';

let products = ref([]);
const isLoading = ref(true);

const topProducts = computed(() => products.value.slice(0, 4));
const bottomProducts = computed(() => products.value.slice(4, 8));

const getProducts = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(
      "https://966a61a1-fc75-4d06-8b55-f8eba92a5079.mock.pstmn.io"
    );
    products.value = response.data.slice(0, 8);
    console.log("Fetched products:", products.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    isLoading.value = false;
  }
};

getProducts();
</script>

<template>
  <section class="container mx-auto px-4 mb-16">
    <h2 class="capitalize text-center text-4xl font-bold mb-8">our products</h2>
    
    <div v-if="isLoading" class="container py-16 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4 text-lg">Loading products...</p>
    </div>
    <!-- Top row - 4 products -->
    <div v-else>
      <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
      <div v-for="product in topProducts" :key="product.id" class=" flex flex-col relative" >
        <img 
          :src="product.images[0]" 
          :alt="product.name"
          class="w-full  object-cover" 
        />
        <span :class="product.status === 'In Stock' ? 'bg-statusBg' : 'bg-red-500' " class="absolute right-2 top-2 rounded-lg text-white p-1 text-xs  z-10">{{ product.status }}</span>
        <div class="bg-grayLightest p-4">
            <h3 class="text-[20px] font-semibold mb-2 line-clamp-1">{{ product.name }}</h3>
            <p class="text-charcoalGray font-medium">{{ product.category }}</p>
            <div class="flex justify-between items-center">
              <p class="text-[20px] font-semibold">{{ product.currency}} {{ product.discounted_price}}</p>
              <p class="text-[#B0B0B0] line-through">{{ product.currency}} {{ product.price}}</p>
            </div>
        </div>
        <div class="bg-black bg-opacity-70 absolute h-full w-full top-0 left-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-30">
          <ButtonComponent
            variant="secondary" 
            :to="{ name: 'ShopView' }" 
            size="custom"
            width="w-fit"
            padding="px-[59px] py-3"
            fontSize="text-base"
            customClass=" font-semibold"
          >
          Add to cart
          </ButtonComponent>
          <div class="flex items-center gap-5 mt-6">
            <div class="flex items-center gap-1 cursor-pointer text-white font-semibold">
              <img src="/public/images/share-white.svg" alt="">
              <span>Share</span>
            </div>
            <div class="flex items-center gap-1 cursor-pointer text-white font-semibold">
              <img src="/public/images/compare-white.svg" alt="">
              <span>Compare</span>
            </div>
            <div class="flex items-center gap-1 cursor-pointer text-white font-semibold">
              <img src="/public/images/like-white.svg" alt="">
              <span>Like</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    <!-- Bottom row - 4 products -->
    <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="product in bottomProducts" :key="product.id" class=" flex flex-col relative">
        <img 
          :src="product.images[0]" 
          :alt="product.name"
          class="w-full  object-cover" 
        />
        <span :class="product.status === 'In Stock' ? 'bg-statusBg' : 'bg-tagBg' " class="absolute right-2 top-2 rounded-lg text-white p-1 text-xs  z-10">{{ product.status }}</span>
        <div class="bg-grayLightest p-4">
          <h3 class="text-[20px] font-semibold mb-2 line-clamp-1">{{ product.name }}</h3>
          <p class="text-charcoalGray font-medium">{{ product.category }}</p>
          <div class="flex justify-between items-center">
            <p class="text-[20px] font-semibold">{{ product.currency}} {{ product.discounted_price}}</p>
            <p class="text-[#B0B0B0] line-through">{{ product.currency}} {{ product.price}}</p>
          </div>
        </div>
        <div class="bg-black bg-opacity-70 absolute h-full w-full top-0 left-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-30">
          <ButtonComponent
            variant="secondary" 
            :to="{ name: 'ShopView' }" 
            size="custom"
            width="w-fit"
            padding="px-[59px] py-3"
            fontSize="text-base"
            customClass=" font-semibold"
          >
          Add to cart
          </ButtonComponent>
          <div class="flex items-center gap-5 mt-6">
            <div class="flex items-center gap-1 cursor-pointer text-white font-semibold">
              <img src="/public/images/share-white.svg" alt="">
              <span>Share</span>
            </div>
            <div class="flex items-center gap-1 cursor-pointer text-white font-semibold">
              <img src="/public/images/compare-white.svg" alt="">
              <span>Compare</span>
            </div>
            <div class="flex items-center gap-1 cursor-pointer text-white font-semibold">
              <img src="/public/images/like-white.svg" alt="">
              <span>Like</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    <div class="text-center w-full flex justify-center">
      <ButtonComponent
        variant="outlined" 
        :to="{ name: 'ShopView' }" 
        size="custom"
        width="w-full md:w-fit"
        padding="py-3 px-[82px]"
        fontSize="text-base"
        customClass="capitalize font-semibold"
      >
        show more
      </ButtonComponent>
    </div>
  </section>
</template>