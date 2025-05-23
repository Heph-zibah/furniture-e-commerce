<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageLayout from '../layouts/PageLayout.vue';
import ProductLoadingComponent from '../components/products/ProductLoadingComponent.vue';
import ProductDetailsComponent from '../components/products/ProductDetailsComponent.vue';
import ProductTabsComponent from '../components/products/ProductTabsComponent.vue';
import { useProductStore } from '../stores/ProductStore.js';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore(); 

const product = ref(null);

const currentProduct = computed(() => {
  if (!productStore.products.length) return null;
  const productId = parseInt(route.params.id);
  return productStore.products.find(p => p.id === productId);
});

const isLoading = computed(() => {
  return productStore.isLoading || (productStore.products.length === 0);
});

onMounted(async () => {
  try {
    if (productStore.products.length === 0) {
      await productStore.getProducts();
    }
    
    
    product.value = currentProduct.value;
    
    if (!product.value) {
      console.error("Product not found");
    } else {
      console.log('Found product:', product.value);
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
});

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <page-layout>
    <div>
     
      <product-loading-component
        v-if="isLoading || !product" 
        :isLoading="isLoading" 
        @go-back="goBack" 
      />
      
     
      <div v-else-if="productStore.error" class="error">
        <p>Error: {{ productStore.error }}</p>
        <button @click="goBack">Go Back</button>
      </div>
      
      
      <div v-else class="">
  
        <product-details-component :product="product" />
     
        <product-tabs-component :product="product" />
      </div>
    </div>
  </page-layout>
</template>