<template>
  <teleport to="body">
    <transition enter-active-class="transition duration-200 ease-out transform" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in transform"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div ref="modal-backdrop" v-if="showModal" class="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
        <div class="flex items-start justify-center min-h-screen pt-24 text-center">
          <div class=" p-8 overflow-hidden text-left rounded-lg shadow-xl" role="dialog" ref="modal" aria-modal="true"
            aria-labelledby="modal-headline">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from "vue"

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  }
})

const { show } = toRefs(props)
const showModal = ref(false);

console.log(show.value, 'show')

watch(() => props.show, (newVal, _oldVal) => {
  showModal.value = newVal
  console.log('showModal.value = show:', showModal.value)
}, { immediate: true, deep: true })
</script>
