<script setup>
import { defineProps } from 'vue';
import BreadcrumbsComponent from '../custom/BreadcrumbsComponent.vue';
import ButtonComponent from '../custom/ButtonComponent.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div>
    
    <div class="bg-beigeLight">
      <div class="container py-[38px]">
        <breadcrumbs-component />
      </div>
    </div>
    
  
    <div class="flex flex-col md:flex-row gap-[41px] md:gap-[82px] container my-[35px]">
     
      <div class="md:w-1/2">
        <img :src="product.images[0]" :alt="product.name" class="w-full h-auto rounded-lg shadow-lg">
      </div>
      
      
      <div class="md:w-1/2">
        <h1 class="text-[24px] md:text-[42px] font-semibold mb-2">{{ product.name }}</h1>
    
        <div class="mb-[15px] flex items-center gap-5">
          <div class="flex items-center">
            <span class="text-2xl md:text-xl lg:text-2xl font-bold text-primary">{{ product.currency }} {{ product.discounted_price.toFixed(2) }}</span>
            <span v-if="product.regular_price > product.discounted_price" class="ml-3 text-gray-400 line-through">${{ product.regular_price.toFixed(2) }}</span>
          </div>
          
          <div v-if="product.status" class="text-white inline-block px-3 py-1 text-sm font-semibold rounded-full"
            :class="{
              'bg-statusBg ': product.status === 'In Stock',
              'bg-red-500 ': product.status === 'Out of Stock',
              'bg-yellow-500': product.status === 'Low Stock',
            }">
            {{ product.status }}
          </div>
        </div>
        
      
        <div class="flex items-center mb-4">
          <div class="flex items-center gap-[7px]">
            <span v-for="i in 5" :key="i" class="text-yellow-400">
              <img v-if="i <= Math.round(product.rating)" src="/public/images/full-star.svg" alt="">
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current text-gray-300" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <span class="ml-2 text-gray-600">({{ product.rating }})</span>
          </div>
          <span class="text-[13px] text-grayMedium border-l-2 border-l-grayMedium pl-[22px] ml-[18px]">{{ product.review_count }} Customer Review</span>
        </div>
        
       
        <div class="mb-6">
          <p class="text-[13px]">{{ product.short_description }}</p>
        </div>

        <div class="flex flex-col lg:flex-row w-full gap-[10px] items-center">
          <button-component
            variant="blackOutlined"
            size="custom"
            width="w-full lg:w-fit"
            padding="px-6 py-2"
            fontSize="text-[20px]"
            customClass="rounded-md outline-0"
          >
            <span class="mr-3 hover:text-white">- </span> 1 <span class="hover:text-white ml-3"> +</span>
          </button-component>
          
          <button-component
            variant="blackOutlined"
            size="custom"
            width="w-full lg:w-fit"
            padding="px-6 py-2"
            fontSize="text-[20px]"
            customClass="rounded-md outline-0"
          >
            Add to cart
          </button-component>
          
          <button-component
            variant="blackOutlined"
            size="custom"
            width="w-full lg:w-fit"
            padding="px-6 py-2"
            fontSize="text-[20px]"
            customClass="rounded-md outline-0"
          >
            <span class="mr-2 hover:text-white">+</span>Compare
          </button-component>
        </div>
        
 
        <div class="mb-6 space-y-3 border-t border-t-grayLight pt-[41px] mt-[60px]">
          <div class="text-grayMedium space-x-2">
            <span>SKU</span>
            <span>: {{ product.sku }}</span>
          </div>
          <div class="text-grayMedium space-x-2">
            <span>Category</span>
            <span>: {{ product.category }}</span>
          </div>
          <div class="text-grayMedium space-x-2">
            <span>Tags</span>
            <span>: {{ Array.isArray(product.tags) ? product.tags.join(', ') : product.tags }}</span>
          </div>
          <div class="text-grayMedium space-x-2 flex items-center gap-2">
            <span>Share :</span>
            <div class="flex items-center gap-2">
              <a href="#"><img src="/public/images/facebook.svg" alt="Share" class="cursor-pointer"></a>
              <a href="#"><img src="/public/images/linkedin.svg" alt="Share" class="cursor-pointer"></a>
              <a href="#"><img src="/public/images/twitter.svg" alt="Share" class="cursor-pointer"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>