<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  rootPath: {
    type: String,
    default: '/'
  },
  homeName: {
    type: String,
    default: 'Home'
  },
  routeNameMap: {
    type: Object,
    default: () => ({})
  }
});

const route = useRoute();

const breadcrumbItems = computed(() => {
  const items = [
    { name: props.homeName, path: props.rootPath }
  ];
  
  if (route.path === props.rootPath) {
    return items;
  }
  
  const pathSegments = route.path.split('/').filter(segment => segment);
  
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    let name;
    
    if (segment === 'shop' && index === 0) {
      name = 'Shop';
    } 
    else if (route.name === 'ProductView' && index === 1 && route.params.id === segment) {
      name = ''; 
    }
    else if (route.name === 'ProductView' && index === 2 && route.params.name === segment) {
      name = decodeURIComponent(segment).replace(/-/g, ' ');
      name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } 

    else {
      name = props.routeNameMap[currentPath] || 
             segment.charAt(0).toUpperCase() + 
             segment.slice(1).replace(/-/g, ' ');
    }
    
    if (name) {
      items.push({
        name,
        path: currentPath
      });
    }
  });
  
  return items;
});
</script>

<template>
  <nav aria-label="Breadcrumb" class="flex">
    <ol class="inline-flex items-center space-x-1 md:space-x-2">
      <li v-for="(item, index) in breadcrumbItems" :key="index" class="">
        <div v-if="index === 0" class="flex items-center">
          <router-link :to="item.path" class="text-black hover:text-primary font-medium ">
            <span>{{ item.name }}</span>
          </router-link>
        </div>
        
        <div v-else class="flex items-center">
          <img src="/public/images/arrow-right.svg" alt="">

          <router-link v-if="index < breadcrumbItems.length - 1" 
            :to="item.path" 
            class="ml-1 md:ml-2 font-medium text-black hover:text-primary">
            {{ item.name }}
          </router-link>

          <span v-else class="ml-1 md:ml-2 font-[300] ">
            {{ item.name }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>