<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ButtonComponent from '../custom/ButtonComponent.vue';
const slides = ref([
  {
    rooms: [
      {
        image: '/images/setup-1.png',
        alt: 'Gallery wall inspiration',
        category: 'Bedroom',
        caption: 'Inner Peace'
      },
      {
        image: '/images/setup-1.png',
        alt: 'Minimal white room',
      },
      {
        image: '/images/setup-1.png',
        alt: 'Scandinavian kitchen',
      },
      {
        image: '/images/setup-1.png',
        alt: 'Wooden furniture design',
      }
    ]
  },
  {
    rooms: [
      {
        image: '/images/setup-2.png',
        alt: 'Cozy living room',
        category: 'Living Room',
        caption: 'Warm & Cozy'
      },
      {
        image: '/images/setup-2.png',
        alt: 'Modern study space',
      },
      {
        image: '/images/setup-2.png',
        alt: 'Minimal dining room',
      },
      {
        image: '/images/setup-2.png',
        alt: 'Spa-like bathroom',
      }
    ]
  },
  {
    rooms: [
      {
        image: '/images/setup-3.png',
        alt: 'Modern kitchen design',
        category: 'Kitchen',
        caption: 'Culinary Delight'
      },
      {
        image: '/images/setup-3.png',
        alt: 'Balcony garden setup',
      },
      {
        image: '/images/setup-3.png',
        alt: 'Bright workspace',
      },
      {
        image: '/images/setup-1.png',
        alt: 'Serene bedroom',
      }
    ]
  }
]);

const currentSlide = ref(0);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

let autoplayInterval = null;

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 5000); 
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
};

onMounted(() => {
  startAutoplay();
});

onBeforeUnmount(() => {
  stopAutoplay();
});
</script>

<template>
    <section class=" mb-[50px]">
        <div class="  py-11 bg-[#FCF8F3] mb-[67px]">
            <div class=" flex flex-col md:flex-row container">
            <div class="w-full md:w-2/5  md:p-8 flex flex-col justify-center">
                <div class="md:w-[345px] md:pr-10 text-center md:text-start">
                    <h1 class="text-3xl md:text-[40px] font-bold  mb-4 leading-[120%]">50+ Beautiful rooms inspiration</h1>
                <p class="text-[#616161] mb-6">Our designer already made a lot of beautiful prototype of rooms that inspire you</p>
                </div>
                <div class="mt-[36px]  w-full flex justify-center md:justify-start text-center">
                    <ButtonComponent 
                        variant="primary" 
                        :to="{ name: 'ShopView' }" 
                        size="custom"
                        width="w-full md:w-fit"
                        padding="py-3 px-[29px]"
                        fontSize="text-base"
                        customClass="capitalize font-bold"
                    > 
                    Explore now
                    </ButtonComponent>
                </div>
            </div>

            <div class="w-full md:w-3/5 relative mt-5 md:mt-0">
                <div class="relative overflow-hidden h-full">
                <div 
                    class="flex transition-transform duration-500 ease-in-out h-full"
                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                    <div v-for="(slide, index) in slides" :key="index" class="w-full flex-shrink-0">
                    <div class="grid grid-cols-2 gap-2 p-2 h-full">
                        <div v-for="(room, roomIndex) in slide.rooms" :key="roomIndex" 
                        class="relative bg-gray-100 rounded-lg overflow-hidden"
                        :class="roomIndex === 0 && index === currentSlide ? 'h-64' : 'h-64'"
                        >
                        <img :src="room.image" :alt="room.alt" class="w-full h-full object-cover" />
                        
                        <div v-if="room.caption" 
                            class="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 mx-3">
                            <div class="flex items-center">
                            <span class="h-2 w-2 bg-amber-500 rounded-full mr-2"></span>
                            <span class="text-sm font-medium text-gray-800">{{ room.category }}</span>
                            </div>
                            <p class="text-gray-700 font-medium mt-1">{{ room.caption }}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <button 
                    @click="prevSlide" 
                    class="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition duration-300"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                <button 
                    @click="nextSlide" 
                    class="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition duration-300"
                    aria-label="Next slide"
                >
                    <img src="/public/images/arrow-right-primary.svg" alt="">
                </button>
                </div>

                <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                <button 
                    v-for="(slide, index) in slides" 
                    :key="index"
                    @click="goToSlide(index)"
                    class="h-2 rounded-full transition-all duration-300"
                    :class="[
                    currentSlide === index ? 'w-6 bg-amber-500' : 'w-2 bg-gray-300',
                    ]"
                    :aria-label="`Go to slide ${index + 1}`"
                ></button>
                </div>
            </div>
            </div>
        </div>
        <div class="container">
            <div class="text-center  ">
            <p class="text-[#616161] font-semibold text-[20px] mb-2">Share your setup with</p>
            <p class="font-bold text-[40px]">#FuniroFurniture</p>
        </div>
        <img src="/public/images/setup-img.png" alt="">
        </div>
    </section>
</template>