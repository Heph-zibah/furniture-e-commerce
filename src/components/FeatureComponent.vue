<script setup>
import {features} from '../lib/data';
</script>

<template>
  <section class="bg-ivoryLight py-[100px]">
    <div class="container grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 items-center justify-center gap-[50px]">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="flex gap-[10px]"
      >
        <div>
          <img :src="feature.image" :alt="feature.alt" aria-hidden="true" />
        </div>
        <div>
          <p
            class="text-textNeutral text-lg md:text-[20px] 2xl:text-[25px] mb-2 font-semibold"
            :aria-label="feature.title"
          >
            {{ feature.title }}
          </p>
          <p class="text-charcoalGray text-sm md:text-[20px] font-medium">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>


