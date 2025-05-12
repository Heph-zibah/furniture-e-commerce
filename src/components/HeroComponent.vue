<script setup>
import { ref } from "vue";
import LogoComponent from "./LogoComponent.vue";
import { useRoute } from "vue-router";
import { navLinks } from "../lib/links";
import axios from "axios";

const route = useRoute(); 
// let products = ref([]);
// const getProducts = async () => {
//   try {
//     const response = await axios.get(
//       "https://966a61a1-fc75-4d06-8b55-f8eba92a5079.mock.pstmn.io"
//     ); 
//     products.value = response.data;

    

//   } catch (error) {
//     console.error(error);
//   }
// };

// getProducts();

const openMobileMenu = ref(false);
const toggleMobileMenu = () => {
  openMobileMenu.value = !openMobileMenu.value;
};
</script>


<template>
    <section class="bg-hero-bg bg-cover bg-no-repeat bg-center h-screen flex flex-col justify-center items-center relative">
        <div class="bg-secondary rounded-[10px] mx-5 mt-10 md:mt-0 pt-[62px]  pb-[37px] pl-[39px] px-[43px] md:absolute right-10 top-[153px] md:w-[643px]">
            <span class="font-semibold tracking-[3px]">New Arrival</span>
            <h1 class="text-[32px] md:text-[52px] md:leading-[65px] font-bold text-primary pt-1 pb-3 md:pb-[17px] ">Discover Our <br class="hidden md:block"> New Collection</h1>
            <p class=" md:text-lg font-medium leading-[24px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
            <button class="mt-[36px] md:mt-[46px] text-white py-[25px] px-[72px] bg-primary uppercase w-full md:w-fit font-bold">buy now</button>
        </div>
    </section>
  <!-- <div>
    <p>hi</p>
    <div v-for="product in products" :key="product.sku">
  <p>hello</p>
  <h1>{{ product.name }}</h1>
  <p>{{ product.description }}</p>
  <img :src="product.images[0]" :alt="product.name" />
</div>
  </div> -->

</template>

