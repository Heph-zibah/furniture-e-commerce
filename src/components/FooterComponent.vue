<script setup>
import { footerLinks } from '../lib/links'

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="bg-primary-500 text-white pt-10 px-5 md:px-[54px] font-medium">
        <div class="flex flex-col gap-5 container">
            <div class="grid grid-cols-1 md:grid-cols-4 justify-center md:justify-between">
                
                <div class="flex flex-col items-center md:items-start justify-center md:justify-start">
                    <router-link 
                        :to="{name:'HomeView'}" 
                        class="flex items-center gap-[5px] mb-[15px] md:mb-[50px]"
                        aria-label="Go to home page"
                    >
                        <img
                            src="/images/logo-white.png"
                            alt="Furniro Logo"
                            class="w-[30px]"
                        />
                        <p class="logo font-bold text-[24px] md:text-[34px] text-white">
                            Furniro
                        </p>
                    </router-link>
                    <address class="text-grayLight text-center md:text-start">
                        400 University Drive Suite 200 Coral Gables, FL 33134 USA
                    </address>
                </div>

                <nav v-for="section in footerLinks" 
                     :key="section.title" 
                     class="mt-[25px] md:mt-0 flex flex-col items-center md:items-start text-center md:text-left"
                     :aria-label="section.title"
                >
                    <h3 class="mb-[50px] text-grayLight">{{ section.title }}</h3>
                    <ul>
                        <li v-for="link in section.links" :key="link.path" class="mb-4">
                            <router-link :to="link.path" class="focus:outline-none focus:ring-2 focus:ring-white">
                                {{ link.name }}
                            </router-link>
                        </li>
                    </ul>
                </nav>
                
                <div class="flex flex-col items-center md:items-start">
                    <h3 class="mb-[50px] text-grayLight">Newsletter</h3>
                    <div class="gap-5 flex flex-col lg::flex-row">
                      
                        <label for="newsletter" class="sr-only">Email Address</label>
                        <input 
                            id="newsletter" 
                            type="email" 
                            placeholder="Enter your Email Address" 
                            class="bg-transparent border-b-2 border-b-white text-white placeholder-grayLight outline-0 focus:ring-2 focus:ring-white"
                            aria-label="Enter your email to subscribe"
                        />
                      
                        <button class="uppercase border-b-2 border-b-white outline-0 ml-5 focus:outline-none focus:ring-2 focus:ring-white">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <p class="py-[36px] border-t border-t-grayLight text-center">
                &copy; {{ currentYear }} <a href="https://www.linkedin.com/in/oadaramola/" class="hover:text-secondary-100">'Tosin Daramola</a>. All rights reserved.
            </p>
        </div>
    </footer>   
</template>
