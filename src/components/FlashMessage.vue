<template>
    <transition name="fade" appear>

        <div class="rounded-md mb-2 p-2 mr-2 shadow-xl transition-opacity ease-in-out duration-700 "
            :class="error ? 'bg-white' : 'bg-white'">
            <div v-if="!error" class="">
                <div class="flex">
                    <!-- <CheckCircleIcon class="h-4 w-4 mt-0.5 text-green-700" aria-hidden="true" /> -->
                    <div class="ml-3">
                        <p class="text-sm text-gray-500">{{ message }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="">

                <div class="flex items-center justify-center">
                    <!-- <ExclamationTriangleIcon class="h-4 w-4 mt-0.5 text-red-700" aria-hidden="true" /> -->
                    <div class="ml-3">
                        <p class="text-sm text-gray-500">{{ message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

defineProps({
    message: String,
    error: false
})

</script>

<style scoped>
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.75s ease;
}
</style>