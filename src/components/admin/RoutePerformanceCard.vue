<template>
    <div class="flex flex-col h-full mt-2">
        <div class="w-full text-sm text-np-base">

            {{ method_path.method }}
        </div>

    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import DynamicButton from '@/components/utilities/DynamicButton.vue'

export default {
    computed: {
        ...mapStores(useStore)
    },
    methods: {
        async readRoutePerformance() {
            await this.Store.readRoutePerformance()
        }
    },
    props: {
        method_path: {
            type: Object,
            required: true
        }
    },
    components: {

    },

}
</script>