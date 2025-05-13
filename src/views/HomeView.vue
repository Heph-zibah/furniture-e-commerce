<script setup>
import PageLayout from '../layouts/PageLayout.vue';
import HeroComponent from '../components/HeroComponent.vue';
import BrowseComponent from '../components/BrowseComponent.vue';
import LandingProductsComponent from '../components/LandingProductsComponent.vue';
import SetupComponent from '../components/SetupComponent.vue';
</script>

<template>
    <page-layout>
        <main>
            <hero-component />
            <browse-component />
            <landing-products-component />
            <setup-component />
        </main>
    </page-layout>
</template>