<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import ButtonComponent from '../custom/ButtonComponent.vue';

let products = ref([]);

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://966a61a1-fc75-4d06-8b55-f8eba92a5079.mock.pstmn.io"
    );
    products.value = response.data;
    console.log("Fetched products:", products.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

getProducts();
</script>
<template>
    <section class="bg-beigeLight py-[22px]">
        <div class="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
            <div class="flex  items-center gap-6 py-[13px]">
                <div class="flex items-center gap-3 cursor-pointer">
                    <img src="/public/images/filter.svg" alt="" class="cursor-pointer">
                    <p class="text-[20px]">Filter</p>
                </div>
                <img src="/public/images/grid.svg" alt="" class="cursor-pointer">
                <img src="/public/images/view-list.svg" alt="" class="cursor-pointer">
                <p class=" border-l-2 border-l-grayMedium pl-[34px] ml-[6px]">Showing 1–16 of 32 results</p>
            </div>
            <div class="flex items-center gap-[29px]">
                <div class="flex items-center gap-[17px]">
                    <label for="" class="text-[20px]">show</label>
                    <select class=" p-3 w-[65px] text-grayMedium outline-none">
                        <option value="8">8</option>
                        <option selected value="16">16</option>
                        <option value="32">32</option>
                        <option value="64">64</option>
                    </select>
                </div>
                <div class="flex items-center gap-[17px]">
                    <label for="">Sort by</label>
                    <select class=" p-3 w-[200px] text-grayMedium outline-none">
                        <option value="default" selected>Default</option>
                        <option value="popularity">Popularity</option>
                        <option value="average rating">Average rating</option>
                        <option value="latest">Latest</option>
                        <option value="price low to high">Price: low to high</option>
                        <option value="price high to low">Price: high to low</option>
                    </select>

                </div>
                    
            </div>
        </div>
    </section>
    <section class="container my-[46px]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div v-for="product in products" :key="product.id" class=" flex flex-col relative">
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
    </section>
</template>