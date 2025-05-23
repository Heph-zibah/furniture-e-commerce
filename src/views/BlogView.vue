<script setup>
import { ref, computed, onMounted } from 'vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeroComponent from '../components/HeroComponent.vue';
import axios from 'axios';
import { formatDate } from '../utils/dateUtils.js';
import PaginationComponent from '../components/custom/PaginationComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import LoadingComponent from '../components/custom/LoadingComponent.vue';

const route = useRoute();
const router = useRouter();
const blogPosts = ref([]);
const isLoading = ref(true);

const fetchBlogPosts = async () => {
  try {
    const response = await axios.get(
      "https://5f9f6d37-4d8f-4be9-ad83-477a08967292.mock.pstmn.io/blog"
    );
    
    blogPosts.value = response.data;
    console.log("Fetched blogs:", blogPosts.value);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchBlogPosts();
});

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
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};
</script>

<template>
    <page-layout>
        <main>
            <hero-component pageTitle="Blog" />
            <section class="container">
                <LoadingComponent 
                    v-if="isLoading"
                    size="medium"
                />
                <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-[35px] md:gap-[71px] mt-[53px] md:mt-[106px]">
                    <div class="col-span-1 md:col-span-3">
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
                                <router-link :to="`/blog/${post.id}/${createSlug(post.title)}`" class="text-black hover:text-primary underline pt-[30px]">Read More</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <div class="bg-white shadow-md rounded-lg p-4 mb-6 w-full">
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
                                <li v-for="post in blogPosts.slice(0, 5)" :key="post.id" class="flex items-center gap-3">
                                    <router-link :to="`/blog/${post.id}/${createSlug(post.title)}`">
                                        <img :src="post.image" alt="" class="w-16 h-12 object-cover rounded">
                                    </router-link>
                                    <div>
                                        <router-link :to="`/blog/${post.id}/${createSlug(post.title)}`" class="hover:text-primary">
                                            <p class="text-sm mb-[5px]">{{ post.title }}</p>
                                        </router-link>
                                        <span class="text-grayMedium text-xs">{{ formatDate(post.date) }}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <pagination-component 
                    :current-page="currentPage" 
                    :total-pages="totalPages" 
                    @change-page="handlePageChange"
                />
            </section>
        </main>
    </page-layout>
</template>