<script setup>
import { ref } from "vue";
import LogoComponent from "./LogoComponent.vue";
import { useRoute } from "vue-router";
import { navLinks } from "../lib/links";
import axios from "axios";
import MobileNavbarComponent from "./MobileNavbarComponent.vue";

const route = useRoute(); 

// const getProducts = async () => {
//   try {
//     const response = await axios.get(
//       "https://79a125c4-bdad-4c27-9703-4b2e33f8e890.mock.pstmn.io"
//     ); 
//     console.log(response.data);
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
  <header class="sticky top-0 z-50 w-full">
    <div class="bg-white p-5 md:px-[54px] md:py-[29px] shadow-md">
      <nav
    class="flex justify-between items-center container"
  >
    <logo-component
      logoSrc="/images/logo.svg"
      altText="My Company Logo"
      aria-label="Home"
    />

    <!-- Desktop Navigation -->
     <ul class="hidden lg:flex gap-[75px] font-medium" role="navigation">
      <li v-for="link in navLinks" :key="link.id">
        <router-link 
          :to="link.path" 
          :class="{ 'text-primary-500 font-semibold border-b-2 border-b-primary-400': route.path === link.path }"
          class="hover:text-primary-400 transition"
          :aria-label="`Go to ${link.name}`"
        >
          {{ link.name }}
        </router-link>
      </li>
    </ul>

    <!-- Desktop Icons -->
    <div class="flex gap-[45px] items-center">
      <router-link
        :to="{name:'Cart'}"
        aria-label="Go to account page"
        class="hidden md:block "
      >
        <img src="/images/account-alert.svg" alt="Account" />
      </router-link>
      <router-link
        :to="{name:'Cart'}"
        aria-label="Search for products"
        class="hidden md:block"
      >
        <img src="/images/search.svg" alt="Search" />
      </router-link>
      <router-link
        :to="{name:'Cart'}"
        aria-label="View liked products"
        class="hidden md:block"
      >
        <img src="/images/like.svg" alt="Liked products" />
      </router-link>
      <router-link :to="{name:'Cart'}" aria-label="Go to shopping cart">
        <img src="/images/cart.svg" alt="Shopping cart" />
      </router-link>
    </div>

    <!-- Mobile Menu Button -->
    <div class="lg:hidden">
      <button
        aria-label="Open navigation menu"
        :aria-expanded="openMobileMenu"
        aria-controls="mobile-nav-menu"
        @click="toggleMobileMenu"
      >
        <img src="/images/hamburger.svg" alt="Menu" class="w-[30px] mt-3" />
      </button>
    </div>

    <!-- Mobile Navigation -->  
     <mobile-navbar-component :open-mobile-menu="openMobileMenu" :toggle-mobile-menu="toggleMobileMenu"/>
  
  </nav>
    </div>
  </header>
</template>

