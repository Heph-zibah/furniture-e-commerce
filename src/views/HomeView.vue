<script setup>
import NavbarComponent from '../components/NavbarComponent.vue';
</script>

<template>
    <h1>hello</h1>
    <router-link :to="{ name: 'ShopView'}">Shop</router-link>
    <navbar-component />
</template>