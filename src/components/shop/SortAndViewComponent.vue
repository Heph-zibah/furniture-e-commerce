<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  viewMode: {
    type: String,
    default: 'grid'
  },
  paginationInfo: {
    type: String,
    required: true
  },
  productsPerPage: {
    type: Number,
    default: 12
  },
  sortOption: {
    type: String,
    default: 'default'
  }
});

const emit = defineEmits([
  'toggle-filter', 
  'change-view', 
  'change-products-per-page', 
  'change-sort'
]);

const toggleFilterPanel = () => {
  emit('toggle-filter');
};

const toggleViewMode = (mode) => {
  emit('change-view', mode);
};

const handleProductsPerPageChange = (e) => {
  emit('change-products-per-page', parseInt(e.target.value));
};

const handleSortChange = (e) => {
  emit('change-sort', e.target.value);
};
</script>

<template>
  <section class="bg-beigeLight py-[22px]">
    <div class="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
      <div class="flex items-center gap-3 md:gap-6 py-[13px]">
        <div @click="toggleFilterPanel" class="flex items-center gap-3 cursor-pointer">
          <img src="/public/images/filter.svg" alt="Filter" class="cursor-pointer">
          <p class="text-sm md:text-[20px]">Filter</p>
        </div>
        <img @click="toggleViewMode('grid')" src="/public/images/grid.svg" alt="Grid View" 
            class="cursor-pointer" :class="{'opacity-50': viewMode !== 'grid'}">
        <img @click="toggleViewMode('list')" src="/public/images/view-list.svg" alt="List View" 
            class="cursor-pointer" :class="{'opacity-50': viewMode !== 'list'}">
        <p class="border-l-2 border-l-grayMedium pl-3 md:pl-[34px] ml-[6px] text-sm md:text-base">
          {{ paginationInfo }}
        </p>
      </div>
      <div class="flex items-center gap-3 md:gap-[29px]">
        <div class="flex items-center gap-2 md:gap-[17px]">
          <label for="productsPerPage" class="text-sm md:text-[20px]">Show</label>
          <select id="productsPerPage" :value="productsPerPage" @change="handleProductsPerPageChange"
                  class="p-3 text-sm md:text-base w-fit md:w-[65px] text-grayMedium outline-none">
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
          </select>
        </div>
        <div class="flex items-center gap-2 md:gap-[17px]">
          <label for="sortOption" class="text-sm md:text-[20px]">Sort by</label>
          <select id="sortOption" :value="sortOption" @change="handleSortChange"
                  class="p-3 text-sm md:text-base w-fit md:w-[200px] text-grayMedium outline-none">
            <option value="default">Default</option>
            <option value="popularity">Popularity</option>
            <option value="average rating">Average rating</option>
            <option value="latest">Latest</option>
            <option value="price low to high">Price: low to high</option>
            <option value="price high to low">Price: high to low</option>
          </select>
        </div>
      </div>
    </div>
  </section>
</template>