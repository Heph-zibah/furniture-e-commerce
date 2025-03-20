<script setup>
import LogoComponent from "./LogoComponent.vue";
import { navLinks } from "../lib/links";
</script>

<template>
  <nav class="flex justify-between items-center p-5 md:py-[29px] md:px-[54px] bg-white shadow-md ">
    <logo-component 
      logoSrc="/images/logo.svg" 
      altText="My Company Logo" 
      aria-label="Home"  
    />
    
    <ul class="hidden md:flex gap-[75px] font-medium" role="navigation">
      <li v-for="link in navLinks" :key="link.id">
        <router-link 
          :to="link.path" 
          :aria-label="`Go to ${link.name}`">{{ link.name }}</router-link>
      </li>
    </ul>
    
    <div class="hidden lg:flex gap-[45px] items-center">
      <router-link to="/cart" aria-label="Go to account page">
        <img src="/images/account-alert.svg" alt="account icon"/>
      </router-link>
      <router-link to="/cart" aria-label="Search for products">
        <img src="/images/search.svg" alt="search icon"/>
      </router-link>
      <router-link to="/cart" aria-label="View liked products">
        <img src="/images/like.svg" alt="like icon"/>
      </router-link>
      <router-link to="/cart" aria-label="Go to shopping cart">
        <img src="/images/cart.svg" alt="Cart icon"/>
      </router-link>
    </div>
    
    <div class="md:hidden ">
      <button 
        aria-label="Open navigation menu" 
        aria-expanded="false" 
        aria-controls="mobile-nav-menu">
        <img src="/images/hamburger.svg" alt="hamburger icon" class="w-[30px] mt-3"/>
      </button>
    </div>
  </nav>
</template>
