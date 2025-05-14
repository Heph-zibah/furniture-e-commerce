<script setup>
import BreadcrumbsComponent from '../components/custom/BreadcrumbsComponent.vue';

const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Shop',
    required: false
  }
});
</script>

<template>
    <section class="bg-all-hero-bg bg-cover bg-no-repeat bg-center h-[316px] relative flex flex-col items-center justify-center">
        <div class=" ">
            <img src="/public/images/logo.svg" alt="" class="mx-auto">
            <h1 class="text-[48px] font-medium">{{ pageTitle }}</h1>
            <breadcrumbs-component />
        </div>
    </section>
</template>