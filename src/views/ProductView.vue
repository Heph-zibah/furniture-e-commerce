<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import PageLayout from '../layouts/PageLayout.vue';
import ProductLoadingComponent from '../components/products/ProductLoadingComponent.vue';
import ProductDetailsComponent from '../components/products/ProductDetailsComponent.vue';
import ProductTabsComponent from '../components/products/ProductTabsComponent.vue';

const route = useRoute();
const router = useRouter();
const product = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const productId = parseInt(route.params.id);
    
    const response = await axios.get(
      "https://966a61a1-fc75-4d06-8b55-f8eba92a5079.mock.pstmn.io"
    );
    
    const foundProduct = response.data.find(p => p.id === productId);
    
    if (foundProduct) {
      product.value = foundProduct;
    } else {
      console.error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  } finally {
    isLoading.value = false;
  }
});

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <page-layout>
    <div>
      <!-- Loading & Not Found States -->
      <product-loading-component
        v-if="isLoading || !product" 
        :isLoading="isLoading" 
        @go-back="goBack" 
      />
      
      <!-- Product Content -->
      <div v-else class="">
        <!-- Product Details -->
        <product-details-component :product="product" />
        
        <!-- Product Tabs -->
        <product-tabs-component :product="product" />
      </div>
    </div>
  </page-layout>
</template>