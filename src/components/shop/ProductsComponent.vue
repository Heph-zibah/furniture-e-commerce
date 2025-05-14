<script setup>
import { ref, computed, watch } from "vue";
import axios from "axios";
import ProductCard from './ProductCard.vue';
import PaginationComponent from '../custom/PaginationComponent.vue';
import FilterComponent from './FilterComponent.vue';
import SortAndViewComponent from './SortAndViewComponent.vue';

// Data and state management
const products = ref([]);
const allProducts = ref([]);
const currentPage = ref(1);
const productsPerPage = ref(12);
const sortOption = ref("default");
const viewMode = ref("grid"); // "grid" or "list"
const isLoading = ref(true);
const showFilterPanel = ref(false);
const categoryFilter = ref("all");
const statusFilter = ref("all");

// Computed properties
const filteredProducts = computed(() => {
  let result = [...allProducts.value];
  
  // Apply category filter
  if (categoryFilter.value !== "all") {
    result = result.filter(product => product.category === categoryFilter.value);
  }
  
  // Apply status filter
  if (statusFilter.value !== "all") {
    result = result.filter(product => product.status === statusFilter.value);
  }
  
  return result;
});

const sortedProducts = computed(() => {
  let result = [...filteredProducts.value];
  
  switch (sortOption.value) {
    case "popularity":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "average rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "latest":
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "price low to high":
      result.sort((a, b) => a.discounted_price - b.discounted_price);
      break;
    case "price high to low":
      result.sort((a, b) => b.discounted_price - a.discounted_price);
      break;
    default:
      result.sort((a, b) => a.id - b.id);
  }
  
  return result;
});

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * productsPerPage.value;
  const endIndex = startIndex + productsPerPage.value;
  return sortedProducts.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / productsPerPage.value);
});

const categories = computed(() => {
  const uniqueCategories = new Set();
  allProducts.value.forEach(product => uniqueCategories.add(product.category));
  return Array.from(uniqueCategories);
});

const statuses = computed(() => {
  const uniqueStatuses = new Set();
  allProducts.value.forEach(product => uniqueStatuses.add(product.status));
  return Array.from(uniqueStatuses);
});

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage.value + 1;
  const end = Math.min(start + productsPerPage.value - 1, filteredProducts.value.length);
  return `Showing ${start}–${end} of ${filteredProducts.value.length} results`;
});

// Methods
const getProducts = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(
      "https://966a61a1-fc75-4d06-8b55-f8eba92a5079.mock.pstmn.io"
    );
    allProducts.value = response.data;
    products.value = paginatedProducts.value;
    console.log("Fetched products:", allProducts.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    isLoading.value = false;
  }
};

const toggleFilterPanel = () => {
  showFilterPanel.value = !showFilterPanel.value;
};

const updateViewMode = (mode) => {
  viewMode.value = mode;
};

const updateProductsPerPage = (number) => {
  productsPerPage.value = number;
  currentPage.value = 1; // Reset to first page when changing items per page
};

const updateSortOption = (option) => {
  sortOption.value = option;
};

const updateCategoryFilter = (category) => {
  categoryFilter.value = category;
};

const updateStatusFilter = (status) => {
  statusFilter.value = status;
};

const addToCart = (product) => {
  console.log("Adding to cart:", product);
  // Implement cart functionality here
  alert(`Added ${product.name} to cart!`);
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

// Watch for changes in filtered products to update current page
watch([sortedProducts, productsPerPage], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }
});

// Watch for changes in pagination to update displayed products
watch([currentPage, paginatedProducts], () => {
  products.value = paginatedProducts.value;
});

// Initial data fetch
getProducts();
</script>

<template>
  <!-- Sort and View Controls Component -->
  <sort-and-view-component
    :view-mode="viewMode"
    :pagination-info="paginationInfo"
    :products-per-page="productsPerPage"
    :sort-option="sortOption"
    @toggle-filter="toggleFilterPanel"
    @change-view="updateViewMode"
    @change-products-per-page="updateProductsPerPage"
    @change-sort="updateSortOption"
  />

  <!-- Filter Panel Component -->
  <filter-component 
    v-if="showFilterPanel"
    :categories="categories"
    :statuses="statuses"
    :category-filter="categoryFilter"
    :status-filter="statusFilter"
    @update-category="updateCategoryFilter"
    @update-status="updateStatusFilter"
  />
 
  <section v-if="isLoading" class="container py-16 text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
    <p class="mt-4 text-lg">Loading products...</p>
  </section>

  <!-- Products Grid View -->
  <section v-else-if="viewMode === 'grid'" class="container my-[46px]">
    <div v-if="products.length === 0" class="text-center py-8">
      <p class="text-lg">No products found matching your criteria.</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <product-card 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
        :view-mode="viewMode"
        @add-to-cart="addToCart"
      />
    </div>
  </section>

  <!-- Products List View -->
  <section v-else class="container my-[46px]">
    <div v-if="products.length === 0" class="text-center py-8">
      <p class="text-lg">No products found matching your criteria.</p>
    </div>
    <div v-else class="flex flex-col gap-4 mb-8">
      <product-card 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
        :view-mode="viewMode"
        @add-to-cart="addToCart"
      />
    </div>
  </section>

  <!-- Pagination -->
  <pagination-component
    :current-page="currentPage" 
    :total-pages="totalPages" 
    @change-page="handlePageChange"
  />
</template>