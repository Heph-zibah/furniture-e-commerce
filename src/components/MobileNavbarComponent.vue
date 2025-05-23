<script setup>
import { navLinks } from "../lib/links";

const props = defineProps({
  openMobileMenu: Boolean,
  toggleMobileMenu: Function,
});
</script>

<template>
    <transition name="slide-fade">
      <div
      v-if="props.openMobileMenu"
      class="lg:hidden bg-black bg-opacity-90 fixed inset-0 z-50"
    >
      <div class="bg-primary-400 fixed inset-0 z-50 sm:w-1/2" id="mobile-nav-menu">
        <div class="flex items-center justify-between p-5 shadow-md">
          <router-link :to="{name:'HomeView'}" class="flex items-center gap-[5px]">
            <img
              src="/images/logo-white.png"
              alt="Furniro Logo"
              class="w-[30px]"
            />
            <p class="logo font-bold text-[24px] md:text-[34px] text-white">
              Furniro
            </p>
          </router-link>
          <button
            aria-label="Close navigation menu"
            @click="props.toggleMobileMenu"
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
            class="hover:bg-primary-200 py-4 rounded-lg pl-5 transition delay-150 duration-300"
          >
            <router-link :to="link.path" :aria-label="`Go to ${link.name}`">
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <div class="md:hidden flex gap-[45px] items-center justify-center my-5">
          <router-link :to="{name:'Cart'}" aria-label="Go to account page">
            <img src="/images/account-alert-white.png" alt="Account" />
          </router-link>
          <router-link :to="{name:'Cart'}" aria-label="Search for products">
            <img src="/images/search-white.png" alt="Search" />
          </router-link>
          <router-link :to="{name:'Cart'}" aria-label="View liked products">
            <img src="/images/like-white.svg" alt="Liked products" class="w-6" />
          </router-link>
        </div>
      </div>
    </div>
    </transition>
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