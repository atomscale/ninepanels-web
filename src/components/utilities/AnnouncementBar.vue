<template>
    <div class="bg-np-accent p-2 rounded-lg flex justify-between items-center">

        <router-link :to="{ name: 'Settings' }" class="text-xs text-np-inverted">🎉 Themes now available in Settings! 🎉
        </router-link>
        <button class="ml-2" >
            <XMarkIcon class="h-5 w-5 text-np-inverted " />
        </button>
    </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import {
  XMarkIcon,
} from '@heroicons/vue/24/outline'

export default {
    computed: {
        ...mapStores(useStore)
    },
    methods: {

    },
    mounted() {

    },

    components: {
        XMarkIcon
    },
}


</script>