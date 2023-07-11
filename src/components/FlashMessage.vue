<template>
    <div class="rounded-md mb-2 p-4 mr-2 shadow-xl transition-opacity ease-in-out duration-700 "
        :class="error ? 'bg-red-50' : 'bg-green-50'">
        <div v-if="!error" class="">
            <div class="flex">
                <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
                <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">{{ message }}</p>
                </div>
            </div>
        </div>
        <div v-else class="">

            <div class="flex items-center justify-center">
                <ExclamationTriangleIcon class="h-6 w-6 text-red-500" aria-hidden="true" />
                <div class="ml-3">
                    <p class="text-sm font-medium text-red-800">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

defineProps({
    message: String,
    error: false
})

</script>