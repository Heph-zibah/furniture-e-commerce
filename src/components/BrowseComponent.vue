<script setup>
import { ref, onMounted } from "vue";

const browseData = ref([
    {
        id: 1,
        name: "Dining",
        images: "/images/browse-1.png",
    },
    {
        id: 2,
        name: "Living",
        images: "/images/browse-2.png",
    },
    {
        id: 3,
        name: "Bedroom",
        images: "/images/browse-3.png",
    },
]);

const currentSlide = ref(0);
const isMobile = ref(false);

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

function checkMobile() {
  isMobile.value = window.innerWidth < 1090;
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % browseData.value.length;
}

function prevSlide() {
  currentSlide.value = currentSlide.value === 0 
    ? browseData.value.length - 1 
    : currentSlide.value - 1;
}

function handleSwipe(e) {
  const touch = e.changedTouches[0];
  const startX = parseInt(touch.target.dataset.startX || 0);
  const currentX = touch.clientX;
  
  if (startX - currentX > 50) nextSlide();
  else if (currentX - startX > 50) prevSlide();
}
</script>

<template>
  <section class="container my-14 text-center px-4">
    <h2 class="text-2xl md:text-3xl font-bold">Browse The Range</h2>
    <p class="md:text-xl text-gray-600 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

  
    <div v-if="!isMobile" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
      <div v-for="item in browseData" :key="item.id">
        <img :src="item.images" :alt="item.name" class="w-full  object-cover" />
        <h3 class="mt-6 text-xl font-semibold">{{ item.name }}</h3>
      </div>
    </div>

    <div v-else class="mt-8 relative">
      <div class="overflow-hidden">
        <div 
          class="flex transition-transform duration-300"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div 
            v-for="item in browseData" 
            :key="item.id" 
            class="w-full flex-shrink-0"
            @touchstart="e => e.target.dataset.startX = e.touches[0].clientX"
            @touchend="handleSwipe"
          >
            <img :src="item.images" :alt="item.name" class="w-full  object-cover" />
            <h3 class="mt-6 text-xl font-semibold">{{ item.name }}</h3>
          </div>
        </div>
      </div>
      
      <div class="flex justify-center mt-4 space-x-2">
        <button 
          v-for="(_, index) in browseData" 
          :key="index"
          @click="currentSlide = index"
          class="w-2 h-2 rounded-full transition-all"
          :class="index === currentSlide ? 'bg-black w-4' : 'bg-gray-300'"
        ></button>
      </div>
    </div>
  </section>
</template>