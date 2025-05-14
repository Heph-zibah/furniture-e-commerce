<script setup>
import PageLayout from '../layouts/PageLayout.vue';
import HeroComponent from '../components/HeroComponent.vue';
import ProductsComponent from '../components/shop/ProductsComponent.vue';
</script>

<template>
    <page-layout>
        <main>
            <hero-component pageTitle="Shop"/>
            <products-component/>
        </main>
    </page-layout>
</template>