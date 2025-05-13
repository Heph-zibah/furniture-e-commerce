

<template>
    <section class="bg-hero-bg bg-cover bg-no-repeat bg-center h-screen relative">
        <div class="bg-secondary rounded-[10px] mx-5  pt-[62px]  pb-[37px] pl-[39px] px-[43px] absolute md:right-10 top-[83px] md:w-[643px] ">
            <span class="font-semibold tracking-[3px]">New Arrival</span>
            <h1 class="text-[32px] md:text-[52px] md:leading-[65px] font-bold text-primary pt-1 pb-3 md:pb-[17px] ">Discover Our <br class="hidden md:block"> New Collection</h1>
            <p class=" md:text-lg font-medium leading-[24px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
            <div class="mt-[36px] md:mt-[46px] w-full flex justify-center md:justify-start text-center">
                <router-link :to="{ name: 'ShopView' }" class=" text-white py-[25px] px-[72px] bg-primary uppercase w-full md:w-fit font-bold">buy now</router-link>
            </div>
        </div>
    </section>
</template>

