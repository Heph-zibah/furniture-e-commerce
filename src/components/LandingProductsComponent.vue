<script setup>
import { ref, computed } from "vue";
import axios from "axios";

let products = ref([]);


const topProducts = computed(() => products.value.slice(0, 4));
const bottomProducts = computed(() => products.value.slice(4, 8));

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://966a61a1-fc75-4d06-8b55-f8eba92a5079.mock.pstmn.io"
    );
    products.value = response.data.slice(0, 8);
    console.log("Fetched products:", products.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

getProducts();
</script>

<template>
  <section class="container mx-auto px-4 mb-16">
    <h2 class="capitalize text-center text-4xl font-bold mb-8">our products</h2>
    
    <!-- Top row - 4 products -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="product in topProducts" :key="product.id" class=" flex flex-col">
        <img 
          :src="product.images[0]" 
          :alt="product.name"
          class="w-full  object-cover" 
        />
        <div class="bg-grayLightest p-4">
            <h3 class="text-[24px] font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-charcoalGray font-medium">{{ product.category }}</p>
            <p class="text-[20px] font-semibold">{{ product.currency}} {{ product.price}}</p>
        </div>
      </div>
    </div>
    
    <!-- Bottom row - 4 products -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="product in bottomProducts" :key="product.id" class="flex flex-col ">
        <img 
          :src="product.images[0]" 
          :alt="product.name"
          class="w-full h-48 object-cover mb-4" 
        />
        <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
        <p class="text-gray-600 text-center">{{ product.description }}</p>
      </div>
    </div>
    
    <div class="text-center">
      <button to="/shop" class="capitalize border border-primary text-primary py-3 px-16 font-semibold hover:bg-primary hover:text-white transition-colors">
        show more
      </button>
    </div>
  </section>
</template>