<script setup>
import { ref, defineProps } from 'vue';
import ButtonComponent from '../custom/ButtonComponent.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const tabs = [
  { name: 'Description', id: 'description' },
  { name: 'Additional Information', id: 'additional-info' },
  { name: 'Reviews', id: 'reviews' }
];
const activeTab = ref(tabs[0].id);
</script>

<template>
  <div class="container my-[35px]">
    <ul class="flex justify-between md:justify-center items-center gap-3 sm:gap-[26px] md:gap-[52px]">
      <li 
        v-for="tab in tabs" 
        :key="tab.id" 
        @click="activeTab = tab.id" 
        :class="{
          'border-b-2 border-primary text-primary font-semibold cursor-pointer': activeTab === tab.id, 
          'text-gray-500 cursor-pointer': activeTab !== tab.id
        }" 
        class="py-2 text-sm md:text-lg"
      >
        {{ tab.name }}
      </li>
    </ul>

    <div v-if="activeTab === 'description'" class="mt-6">
      <p class="text-gray-600 mt-4">{{ product.description || 'No description available.' }}</p>
      <p class="text-gray-600 mt-4">{{ product.short_description || 'No description available.' }}</p>
    </div>

    <div v-if="activeTab === 'additional-info'" class="mt-6">
      <div v-if="product.additional_info && product.additional_info.length > 0" class="space-y-6">
     
        <div v-if="product.additional_info.find(item => item.care_instructions)" class="border-b border-grayLight pb-4">
          <h3 class="text-lg font-semibold mb-2">Care Instructions</h3>
          <p class="text-gray-600">{{ product.additional_info.find(item => item.care_instructions)?.care_instructions }}</p>
        </div>

        <div v-if="product.additional_info.find(item => item.assembly_required)" class="border-b border-grayLight pb-4">
          <h3 class="text-lg font-semibold mb-2">Assembly Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-medium text-sm">Assembly Required</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.assembly_required)?.assembly_required }}</p>
            </div>
            <div>
              <p class="font-medium text-sm">Assembly Instructions</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.assembly_instructions)?.assembly_instructions }}</p>
            </div>
            <div>
              <p class="font-medium text-sm">Tools Required</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.tools_required)?.tools_required }}</p>
            </div>
            <div>
              <p class="font-medium text-sm">Assembly Service</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.assembly_service_option)?.assembly_service_option }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="product.additional_info.find(item => item.return_policy || item.exchange_policy)" class="border-b border-grayLight pb-4">
          <h3 class="text-lg font-semibold mb-2">Return & Exchange Policy</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-medium text-sm">Return Policy</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.return_policy)?.return_policy }}</p>
            </div>
            <div>
              <p class="font-medium text-sm">Exchange Policy</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.exchange_policy)?.exchange_policy }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="product.additional_info.find(item => item.shipping_info || item.shipping_restrictions)" class="border-b border-grayLight pb-4">
          <h3 class="text-lg font-semibold mb-2">Shipping Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-medium text-sm">Shipping Details</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.shipping_info)?.shipping_info }}</p>
            </div>
            <div>
              <p class="font-medium text-sm">Shipping Restrictions</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.shipping_restrictions)?.shipping_restrictions }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="product.additional_info.find(item => item.customer_service || item.live_chat)" class="pb-4">
          <h3 class="text-lg font-semibold mb-2">Customer Support</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-medium text-sm">Customer Service</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.customer_service)?.customer_service }}</p>
            </div>
            <div>
              <p class="font-medium text-sm">Live Chat</p>
              <p class="text-gray-600">{{ product.additional_info.find(item => item.live_chat)?.live_chat }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-6">
        <p class="text-gray-500">No additional information available for this product.</p>
      </div>
    </div>

    <div v-if="activeTab === 'reviews'" class="mt-6">
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Customer Reviews</h3>
        
        <div class="flex items-center gap-4 mb-6">
          <div class="text-4xl font-bold">{{ product.rating }}</div>
          <div>
            <div class="flex items-center gap-1">
              <span v-for="i in 5" :key="i" class="text-yellow-400">
                <svg v-if="i <= Math.round(product.rating)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current text-gray-300" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </div>
            <p class="text-sm text-gray-500">Based on {{ product.review_count }} reviews</p>
          </div>
        </div>
        
        <button-component
          variant="blackOutlined" 
          size="custom"
          width="w-full md:w-fit"
          padding="px-4 py-2"
          customClass="rounded-md outline-0"
          class="mb-6"
        >
          Write a Review
        </button-component>
        
        <div v-if="product.reviews && product.reviews.length > 0" class="space-y-6">
          <div v-for="review in product.reviews" :key="review.id" class="border-b border-grayLight pb-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h4 class="font-medium">{{ review.user }}</h4>
                <div class="flex items-center gap-1 my-1">
                  <span v-for="i in 5" :key="i" class="text-yellow-400">
                    <svg v-if="i <= review.rating" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-gray-300" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>
              </div>
              <span class="text-sm text-gray-500">{{ review.date }}</span>
            </div>
            <p class="text-gray-600">{{ review.comment }}</p>
            <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <p class="capitalize">Verified Purchase: {{ review.verified_purchase }}</p>
              <p>Helpful Votes: {{ review.helpful_votes }}</p>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-10">
          <p class="text-gray-500">No reviews yet. Be the first to review this product!</p>
        </div>
      </div>
    </div>
  </div>
</template>