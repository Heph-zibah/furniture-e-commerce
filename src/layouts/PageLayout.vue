<script  setup>
import NavbarComponent from '../components/NavbarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

</script>


<template>
    <navbar-component />
    <slot />
    <footer-component />
</template>