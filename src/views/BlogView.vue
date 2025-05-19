<script setup>
import { ref, computed } from 'vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeroComponent from '../components/HeroComponent.vue';
import axios from 'axios';
import { formatDate } from '../utils/dateUtils.js';
import PaginationComponent from '../components/custom/PaginationComponent.vue';
const blogPosts = ref([]);
const blogsView = async () => {
    try {
        const response = await axios.get('https://5f9f6d37-4d8f-4be9-ad83-477a08967292.mock.pstmn.io/blog');

        blogPosts.value = response.data
        
        console.log("Fetched blogs:", blogPosts.value);
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}

blogsView();

const categories = ref([]);
const categoriesView = async () => {
    try {
        const response = await axios.get('https://209fb0bd-92e9-44f5-ad39-7ddc7c07bd08.mock.pstmn.io/categories');
        categories.value = response.data;
        console.log("Fetched categories:", categories.value);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
categoriesView();

const getCategoryPostCount = (categoryId) => {
    return blogPosts.value.filter(post => post.category_id === categoryId).length;
}
const currentPage = ref(1);
const postsPerPage = 3;

const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;
    return blogPosts.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(blogPosts.value.length / postsPerPage);
});

const handlePageChange = (page) => {
    currentPage.value = page;
};

</script>

<template>
    <page-layout>
        <main>
            <hero-component pageTitle="Blog" />
            <section class="container">
                <div class="grid md:grid-cols-4 gap-[71px] mt-[106px]">
                    <div class="col-span-3">
                        <div class="">
                            <div v-for="(post, index) in paginatedPosts" :key="index" class="bg-white shadow-md rounded-lg p-4 mb-[54px]">
                                <img :src="post.image" alt="" class="w-full h-auto rounded-lg mb-4">
                                <div class="flex items-center gap-[35px] mt-[17px]">
                                    <div class="flex items-center gap-[7px]">
                                        <img src="/public/images/admin.svg" alt="">
                                        <span class="text-grayMedium ">{{ post.author }}</span>
                                    </div>
                                    <div class="flex items-center gap-[7px]">
                                        <img src="/public/images/calender.svg" alt="">
                                        <span class="text-grayMedium ">{{ formatDate(post.date) }}</span>
                                    </div>
                                    <div class="flex items-center gap-[7px]">
                                        <img src="/public/images/tag.svg" alt="">
                                        <span class="text-grayMedium ">{{ post.category_name }}</span>
                                    </div>
                                </div>
                                <h2 class="text-[30px] font-medium mt-[15px]">{{ post.title }}</h2>
                                <p class="text-grayMedium mt-[12px] text-[15px]">{{ post.excerpt }}</p>
                                <router-link :to="{ name:'BlogView'}" class="text-black hover:text-primary underline pt-[30px]">Read More</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <!-- Categories Section -->
                        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
                            <h3 class="text-[24px] font-medium mb-[33px]">Categories</h3>
                            <ul class="space-y-[36px]">
                                <li v-for="category in categories" :key="category.id" class="flex justify-between items-center py-1">
                                    <span class="text-grayMedium">{{ category.name }}</span>
                                    <span class="text-grayMedium">{{ getCategoryPostCount(category.id) }}</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="bg-white shadow-md rounded-lg p-4">
                            <h3 class="text-lg font-bold mb-4">Recent Posts</h3>
                            <ul class="space-y-[39px]">
                                <router-link :to="{name: 'BlogView'}" v-for="post in paginatedPosts.slice(0, 5)" :key="post.id" class="flex items-center gap-3">
                                    <img :src="post.image" alt="" class="w-16 h-12 object-cover rounded">
                                    <div>
                                        <p class="text-sm mb-[5px]">{{ post.title }}</p>
                                        <span class="text-grayMedium text-xs">{{ formatDate(post.date) }}</span>
                                    </div>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                </div>
                <pagination-component :current-page="currentPage" 
    :total-pages="totalPages" 
    @change-page="handlePageChange"/>
            </section>
        </main>
    </page-layout>
</template>