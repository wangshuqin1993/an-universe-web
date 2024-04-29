<template>
  <div>{{ text }}</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps<{
  date: string | number | Date,
}>();

const date = computed(() => {
  const date = new Date(props.date);
  return date.getTime();
});
const text = ref('');
const timeout = ref();

function calculateTime(timestamp: number) {
  const now = Date.now();
  const diff = now - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) {
    return `${Math.floor(diff / 1000)} seconds ago`;
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)} minutes ago`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)} hours ago`;
  } else {
    const date = new Date(timestamp);
    // yyyy MM dd
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }
}

function check() {
  clearInterval(timeout.value);
  text.value = calculateTime(date.value);
  
  timeout.value = setInterval(() => {
    text.value = calculateTime(date.value);
    if (text.value.indexOf('ago') === -1) {
      clearInterval(timeout.value);
    }
  }, 1000)
}

watch(date, check, { immediate: true });

onBeforeUnmount(() => {
  clearInterval(timeout.value);
});
</script>
