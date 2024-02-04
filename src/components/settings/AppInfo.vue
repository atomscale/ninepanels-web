<template>
    <div class="flex flex-col h-full mt-2 space-y-4 mr-4 text-np-base text-sm">

        <div class="w-full flex justify-between ">

            <div>Version</div>
            <div>{{Store.appVersion}}</div>
        </div>
        <button @click="Store.openRightTray('Releases')" class="flex justify-between w-full">

            <div>Release Notes</div>
            <ChevronRightIcon class="h-4" />
        </button>
        <button @click="Store.openRightTray('InstallGuide')" class="flex justify-between w-full">

            <div>Install as PWA</div>
            <ChevronRightIcon class="h-4" />
        </button>

        <a href="https://github.com/atomscale/ninepanels" target="_blank" class="flex justify-between w-full">

            <div>GitHub</div>
            <ArrowTopRightOnSquareIcon class="h-4" />
        </a>
        <button @click="Store.openRightTray('About')" class="flex justify-between w-full">

            <div>About</div>
            <ChevronRightIcon class="h-4" />
        </button>


    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { ChevronRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import DynamicButton from '@/components/general/DynamicButton.vue'

export default {
    computed: {
        ...mapStores(useStore)
    },

    components: {
        DynamicButton,
        ChevronRightIcon,
        ArrowTopRightOnSquareIcon,
    },

}
</script>