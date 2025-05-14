<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  statuses: {
    type: Array,
    required: true
  },
  categoryFilter: {
    type: String,
    default: 'all'
  },
  statusFilter: {
    type: String,
    default: 'all'
  }
});

const emit = defineEmits(['update-category', 'update-status']);

const selectCategory = (category) => {
  emit('update-category', category);
};

const selectStatus = (status) => {
  emit('update-status', status);
};
</script>

<template>
  <section class="my-4 p-4 bg-beigeLight rounded-lg transition-all duration-300">
    <div class="container">
      <h2 class="text-xl font-semibold mb-4">Filter Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 justify-between gap-6">
        <div>
          <h3 class="text-lg font-medium mb-2">Category</h3>
          <div class="flex flex-wrap gap-2">
            <button @click="selectCategory('all')" 
                    :class="{'bg-primary text-white': categoryFilter === 'all', 'bg-white': categoryFilter !== 'all'}"
                    class="px-3 py-1 rounded-lg text-sm">
              All
            </button>
            <button v-for="category in categories" :key="category"
                    @click="selectCategory(category)"
                    :class="{'bg-primary text-white': categoryFilter === category, 'bg-white': categoryFilter !== category}"
                    class="px-3 py-1 rounded-lg text-sm">
              {{ category }}
            </button>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-medium mb-2">Status</h3>
          <div class="flex flex-wrap gap-2">
            <button @click="selectStatus('all')" 
                    :class="{'bg-primary text-white': statusFilter === 'all', 'bg-white': statusFilter !== 'all'}"
                    class="px-3 py-1 rounded-lg text-sm">
              All
            </button>
            <button v-for="status in statuses" :key="status"
                    @click="selectStatus(status)"
                    :class="{'bg-primary text-white': statusFilter === status, 'bg-white': statusFilter !== status}"
                    class="px-3 py-1 rounded-lg text-sm">
              {{ status }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>