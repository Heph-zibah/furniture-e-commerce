<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'neutral', 'outlined'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', 'custom'].includes(value)
  },
  width: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  },
  padding: {
    type: String,
    default: null
  },
  fontSize: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  to: {
    type: [String, Object],
    default: null
  },
  customClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

const classes = computed(() => {
  // Base classes for all buttons
  const baseClasses = 'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes - only applied if not using custom dimensions
  let sizeClasses = '';
  if (props.size !== 'custom') {
    const sizeMap = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl'
    };
    sizeClasses = sizeMap[props.size];
  }
  
  // Custom size classes - override the preset sizes
  const customSizeClasses = [];
  if (props.width) customSizeClasses.push(props.width);
  if (props.height) customSizeClasses.push(props.height);
  if (props.padding) customSizeClasses.push(props.padding);
  if (props.fontSize) customSizeClasses.push(props.fontSize);
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-500 text-white focus:ring-primary disabled:bg-primary-50 transition-colors',
    secondary: 'bg-white hover:bg-secondary-500 text-primary hover:text-white focus:ring-secondary disabled:bg-secondary-50  transition-colors',
    neutral: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 disabled:bg-gray-300  transition-colors',
    outlined: 'bg-transparent hover:bg-primary text-primary hover:text-white border border-primary focus:ring-primary disabled:text-gray-300 disabled:border-gray-200 transition-colors'
  };
  
  return [
    baseClasses,
    sizeClasses,
    ...customSizeClasses,
    variantClasses[props.variant],
    props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    props.customClass
  ].join(' ');
});

// Determine what component to render (button or router-link)
const tag = computed(() => props.to ? 'router-link' : 'button');
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :type="!to ? type : undefined"
    :class="classes"
    :disabled="disabled"
    @click="!to ? handleClick : undefined"
  >
    <slot></slot>
  </component>
</template>