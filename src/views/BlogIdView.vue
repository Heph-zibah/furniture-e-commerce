<script setup>
import { ref, onMounted } from 'vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeroComponent from '../components/HeroComponent.vue';
import axios from 'axios';
import { formatDate } from '../utils/dateUtils.js';
import { useRoute, useRouter } from 'vue-router';
import LoadingComponent from '../components/custom/LoadingComponent.vue';
import BreadcrumbsComponent from '../components/custom/BreadcrumbsComponent.vue';
const route = useRoute();
const router = useRouter();
const blog = ref(null);
const isLoading = ref(true);
const relatedPosts = ref([]);

onMounted(async () => {
  try {
    // Get the blog ID from the route parameters
    const blogId = parseInt(route.params.id);
    
    // Fetch all blogs to find the specific one and potential related posts
    const response = await axios.get(
      "https://5f9f6d37-4d8f-4be9-ad83-477a08967292.mock.pstmn.io/blog"
    );
    
    // Find the specific blog post
    const foundBlog = response.data.find(b => b.id === blogId);
    
    if (foundBlog) {
      blog.value = foundBlog;
      
      // Find related posts (same category)
      relatedPosts.value = response.data
        .filter(post => post.category_id === foundBlog.category_id && post.id !== foundBlog.id)
        .slice(0, 3); // Limit to 3 related posts
    } else {
      console.error("Blog not found");
      // Redirect to blog listing page if blog not found
      router.push('/blog');
    }
  } catch (error) {
    console.error("Error fetching blog details:", error);
  } finally {
    isLoading.value = false;
  }
});

// Helper function to create URL-friendly slugs
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
        <div class="bg-beigeLight">
            <div class="container py-[38px]">
                <breadcrumbs-component />
            </div>
        </div>
        <section class="container py-16">
            <!-- Loading State -->
            <LoadingComponent 
                v-if="isLoading"
                size="medium"
            />
            
            <!-- Error State -->
            <div v-else-if="!blog" class="flex justify-center items-center py-20">
                <div class="text-xl text-red-500">Blog post not found</div>
            </div>
            
            <!-- Blog Content -->
            <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-[35px] md:gap-[71px]">
            <!-- Main Blog Content -->
            <div class="col-span-1 md:col-span-3">
                <div class="bg-white shadow-md rounded-lg p-8">
                <!-- Blog Header -->
                <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ blog.title }}</h1>
                
                <!-- Blog Meta Information -->
                <div class="flex flex-wrap items-center gap-[35px] mb-6">
                    <div class="flex items-center gap-[7px]">
                    <img src="/public/images/admin.svg" alt="">
                    <span class="text-grayMedium">{{ blog.author }}</span>
                    </div>
                    <div class="flex items-center gap-[7px]">
                    <img src="/public/images/calender.svg" alt="">
                    <span class="text-grayMedium">{{ formatDate(blog.date) }}</span>
                    </div>
                    <div class="flex items-center gap-[7px]">
                    <img src="/public/images/tag.svg" alt="">
                    <span class="text-grayMedium">{{ blog.category_name }}</span>
                    </div>
                </div>
                
                <!-- Featured Image -->
                <img :src="blog.image" alt="" class="w-full h-auto rounded-lg mb-8">
                
                <!-- Blog Content -->
                <div class="prose max-w-none text-justify">
                    <!-- If content is HTML -->
                    <div v-if="blog.content" v-html="blog.content"></div>
                    
                    <!-- If content is not available, show excerpt -->
                    <div v-else>
                    <p class="text-grayMedium mb-4">{{ blog.excerpt }}</p>
                    
                    <!-- Example placeholder content -->
                    <h2 class="text-2xl font-bold mt-8 mb-4">Introduction</h2>
                    <p class="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                        Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                        rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
                    </p>
                    
                    <h2 class="text-2xl font-bold mt-8 mb-4">Key Insights</h2>
                    <p class="mb-4">
                        Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. 
                        Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
                    </p>
                    
                    <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                    <p class="mb-4">
                        Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique 
                        cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
                    </p>
                    </div>
                </div>
                
                <!-- Tags -->
                <div class="mt-8 pt-6 border-t border-gray-200">
                    <div class="flex flex-wrap gap-2">
                    <span class="text-sm font-medium">Tags:</span>
                    
                    <span  class="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        {{ blog.category_name }}
                    </span>
                    </div>
                </div>
                
                <!-- Share Buttons -->
                <div class="mt-6">
                    <h3 class="text-lg font-medium mb-3">Share this post</h3>
                    <div class="flex gap-3">
                    <button class="p-2 ">
                        <img src="/public/images/facebook.svg" alt="">
                    </button>
                    <button class="p-2 ">
                       <img src="/public/images/linkedin.svg" alt="">
                    </button>
                    <button class="p-2 ">
                        <img src="/public/images/twitter.svg" alt="">
                    </button>
                    </div>
                </div>
                </div>
                
                <!-- Related Posts -->
                <div class="mt-10">
                <h2 class="text-2xl font-bold mb-6">Related Posts</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="post in relatedPosts" :key="post.id" class="bg-white shadow-md rounded-lg overflow-hidden">
                    <img :src="post.image" alt="" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-medium mb-2">{{ post.title }}</h3>
                        <p class="text-grayMedium text-sm mb-3 line-clamp-2">{{ post.excerpt }}</p>
                        <router-link :to="`/blog/${post.id}/${createSlug(post.title)}`" class="text-primary hover:underline">
                        Read More
                        </router-link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
            <!-- Sidebar -->
            <div class="col-span-1">
                <!-- Author Info -->
                <div class="bg-white shadow-md rounded-lg p-4 mb-6">
                <h3 class="text-xl font-medium mb-4">About the Author</h3>
                <div class="flex items-center gap-3 mb-3">
                    <img src="/public/images/admin.svg" alt="" class="w-12 h-12 rounded-full bg-gray-200">
                    <h4 class="font-medium">{{ blog.author }}</h4>
                </div>
                <p class="text-grayMedium text-sm">
                    Professional writer and content creator specializing in {{ blog.category_name }}.
                </p>
                </div>
                
                <!-- Recent Posts -->
                <div class="bg-white shadow-md rounded-lg p-4">
                <h3 class="text-xl font-medium mb-4">Recent Posts</h3>
                <div v-if="relatedPosts.length === 0" class="text-grayMedium text-sm">
                    No related posts found.
                </div>
                <ul v-else class="space-y-4">
                    <li v-for="post in relatedPosts" :key="post.id" class="flex items-center gap-3">
                    <router-link :to="`/blog/${post.id}/${createSlug(post.slug)}`">
                        <img :src="post.image" alt="" class="w-16 h-12 object-cover rounded">
                    </router-link>
                    <div>
                        <router-link :to="`/blog/${post.id}/${createSlug(post.slug)}`" class="hover:text-primary">
                        <p class="text-sm mb-1">{{ post.title }}</p>
                        </router-link>
                        <span class="text-grayMedium text-xs">{{ formatDate(post.date) }}</span>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </section>
    </main>
  </page-layout>
</template>