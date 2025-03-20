<script setup>
import { ref } from "vue";
import LogoComponent from "./LogoComponent.vue";
import { navLinks } from "../lib/links";
import axios from "axios";

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://457e7b1d-ed87-491b-bee1-c6cb65e74211.mock.pstmn.io"
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getProducts();

const openMobileMenu = ref(false);
const toggleMobileMenu = () => {
  openMobileMenu.value = !openMobileMenu.value;
};
</script>

<template>
  <nav
    class="flex justify-between items-center p-5 md:py-[29px] md:px-[54px] bg-white shadow-md"
  >
    <logo-component
      logoSrc="/images/logo.svg"
      altText="My Company Logo"
      aria-label="Home"
    />

    <!-- Desktop Navigation -->
    <ul class="hidden lg:flex gap-[75px] font-medium" role="navigation">
      <li v-for="link in navLinks" :key="link.id">
        <router-link :to="link.path" :aria-label="`Go to ${link.name}`">
          {{ link.name }}
        </router-link>
      </li>
    </ul>

    <!-- Desktop Icons -->
    <div class="flex gap-[45px] items-center">
      <router-link
        to="/cart"
        aria-label="Go to account page"
        class="hidden md:block"
      >
        <img src="/images/account-alert.svg" alt="Account" />
      </router-link>
      <router-link
        to="/cart"
        aria-label="Search for products"
        class="hidden md:block"
      >
        <img src="/images/search.svg" alt="Search" />
      </router-link>
      <router-link
        to="/cart"
        aria-label="View liked products"
        class="hidden md:block"
      >
        <img src="/images/like.svg" alt="Liked products" />
      </router-link>
      <router-link to="/cart" aria-label="Go to shopping cart">
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
    <transition name="slide-fade">
      <div
      v-if="openMobileMenu"
      class="lg:hidden bg-black bg-opacity-90 fixed inset-0 z-50"
    >
      <div class="bg-primary-400 fixed inset-0 z-50 sm:w-1/2" id="mobile-nav-menu">
        <div class="flex items-center justify-between p-5 shadow-md">
          <div class="flex items-center gap-[5px]">
            <img
              src="/images/logo-white.png"
              alt="Furniro Logo"
              class="w-[30px]"
            />
            <p class="logo font-bold text-[24px] md:text-[34px] text-white">
              Furniro
            </p>
          </div>
          <!-- Close Button with Proper Labeling -->
          <button
            aria-label="Close navigation menu"
            @click="toggleMobileMenu"
          >
            <img
              src="/images/close-white.svg"
              alt="Close menu"
              class="w-[35px]"
            />
          </button>
        </div>

        <ul class="flex flex-col font-medium text-white text-xl my-5" role="navigation">
          <li
            v-for="link in navLinks"
            :key="link.id"
            class="hover:bg-primary-200 py-4 rounded-lg pl-5"
          >
            <router-link :to="link.path" :aria-label="`Go to ${link.name}`">
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <!-- Mobile Icons -->
        <div class="md:hidden flex gap-[45px] items-center justify-center my-5">
          <router-link to="/cart" aria-label="Go to account page">
            <img src="/images/account-alert-white.png" alt="Account" />
          </router-link>
          <router-link to="/cart" aria-label="Search for products">
            <img src="/images/search-white.png" alt="Search" />
          </router-link>
          <router-link to="/cart" aria-label="View liked products">
            <img src="/images/like-white.svg" alt="Liked products" class="w-6" />
          </router-link>
        </div>
      </div>
    </div>
    </transition>
  </nav>
</template>

<style scoped>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
