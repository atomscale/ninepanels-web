<template>
    <div class="flex flex-col h-full mt-2 space-y-4 mr-4 text-np-base text-sm">
        <div class="w-full">

            <button @click="mainStore.openRightTray('PrivacyPolicy')" class="flex justify-between w-full">

                <div>Privacy and Data Policy</div>
                <ChevronRightIcon class="h-4" />
            </button>

        </div>

    </div>
</template>

<script>

import { useMainStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { ChevronRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import DynamicButton from '@/components/general/DynamicButton.vue'

export default {
    computed: {
        ...mapStores(useMainStore)
    },


    components: {
        DynamicButton,
        ChevronRightIcon,
        ArrowTopRightOnSquareIcon,
    },

}
</script>

