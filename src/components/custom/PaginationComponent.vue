<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['change-page']);



const prevPage = () => {
  if (props.currentPage > 1) {
    emit('change-page', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('change-page', props.currentPage + 1);
  }
};
const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('change-page', page);
  }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <section class="mt-[30px] mb-[85px]">
    <div class="flex items-center justify-center gap-3">
      <div @click="prevPage" 
           :class="{'cursor-not-allowed opacity-50': currentPage === 1}"
           class="bg-beigeLight px-5 md:px-6 py-[15px] rounded-[10px] text-sm md:text-[20px] cursor-pointer">
        <p>Prev</p>
      </div>
      <ul class="flex items-center gap-3">
        <!-- Limited page numbers for better UX -->
        <template v-if="totalPages <= 5">
          <li v-for="page in totalPages" :key="page"
              @click="changePage(page)"
              :class="{'bg-primary': currentPage === page, 'bg-beigeLight': currentPage !== page}"
              class="px-5 md:px-6 py-[15px] rounded-[10px] text-sm md:text-[20px] cursor-pointer">
            {{ page }}
          </li>
        </template>
        <template v-else>
          <!-- First page -->
          <li @click="changePage(1)"
              :class="{'bg-primary': currentPage === 1, 'bg-beigeLight': currentPage !== 1}"
              class="px-5 md:px-6 py-[15px] rounded-[10px] text-sm md:text-[20px] cursor-pointer">
            1
          </li>
          
          <!-- Ellipsis if needed -->
          <li v-if="currentPage > 3" class="text-center px-2">...</li>
          
          <!-- Pages around current -->
          <template v-for="page in totalPages" :key="page">
            <li v-if="page !== 1 && page !== totalPages && 
                      (page === currentPage || 
                       page === currentPage - 1 || 
                       page === currentPage + 1)"
                @click="changePage(page)"
                :class="{'bg-primary': currentPage === page, 'bg-beigeLight': currentPage !== page}"
                class="px-5 md:px-6 py-[15px] rounded-[10px] text-sm md:text-[20px] cursor-pointer">
              {{ page }}
            </li>
          </template>
          
          <!-- Ellipsis if needed -->
          <li v-if="currentPage < totalPages - 2" class="text-center px-2">...</li>
          
          <!-- Last page -->
          <li @click="changePage(totalPages)"
              :class="{'bg-primary': currentPage === totalPages, 'bg-beigeLight': currentPage !== totalPages}"
              class="px-5 md:px-6 py-[15px] rounded-[10px] text-sm md:text-[20px] cursor-pointer">
            {{ totalPages }}
          </li>
        </template>
      </ul>
      <div @click="nextPage"
           :class="{'cursor-not-allowed opacity-50': currentPage === totalPages || totalPages === 0}"
           class="bg-beigeLight px-5 md:px-6 py-[15px] rounded-[10px] text-sm md:text-[20px] cursor-pointer">
        <p>Next</p>
      </div>
    </div>
  </section>
</template>