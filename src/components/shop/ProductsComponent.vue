<script setup>
import { ref, computed, watch, onMounted } from "vue";
import ProductCard from './ProductCard.vue';
import PaginationComponent from '../custom/PaginationComponent.vue';
import FilterComponent from './FilterComponent.vue';
import SortAndViewComponent from './SortAndViewComponent.vue';
import LoadingComponent from '../custom/LoadingComponent.vue';
import { useProductStore } from "../../stores/ProductStore";

const productStore = useProductStore();

const currentPage = ref(1);
const productsPerPage = ref(12);
const sortOption = ref("default");
const viewMode = ref("grid"); 
const showFilterPanel = ref(false);
const categoryFilter = ref("all");
const statusFilter = ref("all");

const { products, isLoading, error } = productStore;

const filteredProducts = computed(() => {
  let result = [...products];
  
  
  if (categoryFilter.value !== "all") {
    result = result.filter(product => product.category === categoryFilter.value);
  }

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
  products.forEach(product => uniqueCategories.add(product.category));
  return Array.from(uniqueCategories);
});

const statuses = computed(() => {
  const uniqueStatuses = new Set();
  products.forEach(product => uniqueStatuses.add(product.status));
  return Array.from(uniqueStatuses);
});

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage.value + 1;
  const end = Math.min(start + productsPerPage.value - 1, filteredProducts.value.length);
  return `Showing ${start}–${end} of ${filteredProducts.value.length} results`;
});

const toggleFilterPanel = () => {
  showFilterPanel.value = !showFilterPanel.value;
};

const updateViewMode = (mode) => {
  viewMode.value = mode;
};

const updateProductsPerPage = (number) => {
  productsPerPage.value = number;
  currentPage.value = 1; 
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
  alert(`Added ${product.name} to cart!`);
};

const handlePageChange = (page) => {
  currentPage.value = page;
};


watch([sortedProducts, productsPerPage], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }
});

onMounted(async () => {
  try {
    await productStore.getProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
  }
});
</script>

<template>
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

 
  <filter-component 
    v-if="showFilterPanel"
    :categories="categories"
    :statuses="statuses"
    :category-filter="categoryFilter"
    :status-filter="statusFilter"
    @update-category="updateCategoryFilter"
    @update-status="updateStatusFilter"
  />
 

  <LoadingComponent 
    v-if="isLoading" 
    size="medium"
  />


  <div v-else-if="error" class="container my-[46px] text-center">
    <p class="text-red-500 text-lg">Error loading products: {{ error }}</p>
    <button @click="productStore.getProducts()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Retry
    </button>
  </div>

  
  <section v-else-if="viewMode === 'grid'" class="container my-[46px]">
    <div v-if="paginatedProducts.length === 0" class="text-center py-8">
      <p class="text-lg">No products found matching your criteria.</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <product-card 
        v-for="product in paginatedProducts" 
        :key="product.id" 
        :product="product" 
        :view-mode="viewMode"
        @add-to-cart="addToCart"
      />
    </div>
  </section>

  <!-- Products List View -->
  <section v-else class="container my-[46px]">
    <div v-if="paginatedProducts.length === 0" class="text-center py-8">
      <p class="text-lg">No products found matching your criteria.</p>
    </div>
    <div v-else class="flex flex-col gap-4 mb-8">
      <product-card 
        v-for="product in paginatedProducts" 
        :key="product.id" 
        :product="product" 
        :view-mode="viewMode"
        @add-to-cart="addToCart"
      />
    </div>
  </section>

 
  <pagination-component
    v-if="!isLoading && !error && paginatedProducts.length > 0"
    :current-page="currentPage" 
    :total-pages="totalPages" 
    @change-page="handlePageChange"
  />
</template>