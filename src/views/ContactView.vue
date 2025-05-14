<script setup>
import PageLayout from '../layouts/PageLayout.vue';
import HeroComponent from '../components/HeroComponent.vue';
import ButtonComponent from '../components/custom/ButtonComponent.vue';
</script>

<template>
    <page-layout>
        <main>
            <hero-component pageTitle="Contact"/>
            <section class="container mt-[98px] mb-[63px]">
                <div class="text-center max-w-[644px] mx-auto">
                    <h2 class="text-[30px] md:text-[36px] font-semibold">Get In Touch With Us</h2>
                    <p class="text-grayMedium mt-[7px]">For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                </div>
                <div class="mt-[73px] md:mt-[133px] grid grid-cols-1 md:grid-cols-2  gap-10 md:gap-0">
                    <div class="flex flex-col gap-[30px] w-full">
                        <div class="flex items-center gap-[20px]  text-sm">
                            <img src="/public/images/address.svg" alt="">
                            <div >
                                <p class="font-medium text-[24px]">Address</p>
                                <p class="mt-2">236 5th SE Avenue, New York NY10000, United States</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-[20px]  text-sm">
                            <img src="/public/images/phone.svg" alt="">
                            <div >
                                <p class="font-medium text-[24px]">Phone</p>
                                <p class="mt-2">Mobile: +(84) 546-6789</p>
                                <p>Hotline: +(84) 456-6789</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-[20px]  text-sm">
                            <img src="/public/images/time.svg" alt="">
                            <div >
                                <p class="font-medium text-[24px]">Working Time</p>
                                <p class="mt-2">Monday-Friday: 9:00 - 22:00</p>
                                <p>Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>
                    </div>
                    <form action="">
                        <div class="flex flex-col gap-1 mb-[36px]">
                            <label for="name" class=" font-medium">Your Name<span class="text-red-500">*</span></label>
                            <input type="text" class="w-full border border-grayMedium rounded-[10px] py-3 px-[29px] outline-none" id="name" placeholder="Your Name">
                        </div>
                        <div class="flex flex-col gap-1 mb-[36px]">
                            <label for="name" class=" font-medium">Email address<span class="text-red-500">*</span></label>
                            <input type="email" class="w-full border border-grayMedium rounded-[10px] py-3 px-[29px] outline-none" id="name" placeholder="Abc@def.com">
                        </div>
                        <div class="flex flex-col gap-1 mb-[36px]">
                            <label for="name" class=" font-medium">Subject</label>
                            <input type="text" class="w-full border border-grayMedium rounded-[10px] py-3 px-[29px] outline-none" id="name" placeholder="This is optional">
                        </div>
                        <div class="flex flex-col gap-1 mb-[36px]">
                            <label for="name" class=" font-medium">Message<span class="text-red-500">*</span></label>
                            <textarea class="w-full border border-grayMedium rounded-[10px] py-3 px-[29px] outline-none" id="name" placeholder="Hi! i’d like to ask about" rows="5"></textarea>
                        </div>
                        <div class="mt-[36px] md:mt-[46px] w-full flex justify-center md:justify-start text-center">
                <ButtonComponent 
                    variant="primary" 
                    :to="{ name: 'ShopView' }" 
                    size="custom"
                    width="w-full md:w-fit"
                    padding="py-[13px] px-[89px]"
                    fontSize="text-base"
                    customClass="uppercase font-bold"
                >
                    submit
                </ButtonComponent>
            </div>
                    </form>
                </div>
            </section>
        </main>
    </page-layout>
</template>