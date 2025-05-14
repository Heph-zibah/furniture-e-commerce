<script setup>
import PageLayout from '../layouts/PageLayout.vue';
import HeroComponent from '../components/HeroComponent.vue';
</script>

<template>
    <page-layout>
        <main>
            <hero-component pageTitle="Contact"/>
            <section class="mt-[98px] mb-[63px]">
                <div class="text-center max-w-[644px] mx-auto">
                    <h2 class="text-[36px] font-semibold">Get In Touch With Us</h2>
                    <p class="text-grayMedium mt-[7px]">For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                </div>
                <div class="container mt-[133px] grid grid-cols-1 md:grid-cols-2 ">
                    <div class="flex flex-col gap-[30px]">
                        <div class="flex items-center gap-[20px] max-w-[212px] mx-auto text-sm">
                            <img src="/public/images/address.svg" alt="">
                            <div class="mt-1">
                                <p class="font-medium text-[24px]">Address</p>
                                <p>236 5th SE Avenue, New York NY10000, United States</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-[20px] max-w-[212px] mx-auto text-sm">
                            <img src="/public/images/phone.svg" alt="">
                            <div class="mt-1">
                                <p class="font-medium text-[24px]">Phone</p>
                                <p>Mobile: +(84) 546-6789</p>
                                <p>Hotline: +(84) 456-6789</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-[20px] max-w-[212px] mx-auto text-sm">
                            <img src="/public/images/time.svg" alt="">
                            <div class="mt-1">
                                <p class="font-medium text-[24px]">Working Time</p>
                                <p>Monday-Friday: 9:00 - 22:00</p>
                                <p>Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </page-layout>
</template>