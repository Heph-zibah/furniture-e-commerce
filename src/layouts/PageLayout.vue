<script  setup>
import NavbarComponent from '../components/NavbarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import FeatureComponent from '../components/FeatureComponent.vue';
</script>


<template>
    <navbar-component />
    <slot />
    <feature-component />
    <footer-component />
</template>