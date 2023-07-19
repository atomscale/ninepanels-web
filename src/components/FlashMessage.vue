<template>
    <transition name="fade" appear>

        <div class="rounded-md mb-2 p-2 mr-2 transition-opacity ease-in-out duration-700 bg-gray-200"
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