<template>
    <transition name="fade" appear>

        <div class="animate-custom-bounce rounded-md mb-2 p-2 mr-2 z-50 bg-gray-200"
            :class="error ? '' : ''">
            <div v-if="!error" class="">
                <div class="flex">
                    <div >
                        <p class="text-sm text-gray-600">{{ message }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="">

                <div class="flex items-center justify-center">
                    <div >
                        <p class="text-sm text-gray-600">{{ message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>

defineProps({
    message: String,
    error: false
})

</script>

<style scoped>

</style>