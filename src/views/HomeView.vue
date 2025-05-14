<script setup>
import PageLayout from '../layouts/PageLayout.vue';
import HeroComponent from '../components/home/HeroComponent.vue';
import BrowseComponent from '../components/home/BrowseComponent.vue';
import ProductsComponent from '../components/home/ProductsComponent.vue';
import SetupComponent from '../components/home/SetupComponent.vue';
</script>

<template>
    <page-layout>
        <main>
            <hero-component />
            <browse-component />
            <products-component />
            <setup-component />
        </main>
    </page-layout>
</template>