<template >
    <div class="flex items-center justify-center p-5 mt-8">
        <div class="grid grid-cols-3 gap-1 w-2/5 mx-auto">
            <div v-for="i in 9" :key="i" class="aspect-w-1 aspect-h-1 rounded-lg">
                <div class="aspect-content">
                    <div :class="panelStyle(i)"
                        class="flex items-center justify-center text-gray-500 border  border-gray-300 text-sm rounded-lg hover:scale-105">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'


export default {
    computed: {
        ...mapStores(useStore),

    },
    components: {

    },
    mounted() {
        this.Store.getPanelConsistencyAction()
        console.log(this.shading['0.2'])
    },
    methods: {
        panelStyle(i) {
            if (this.Store.consistency[i - 1]) {
                const shade = this.panelShading(i)
                const format = 'border-1 border-gray-300'
                console.log(format + ' ' + shade)
                return format + ' ' + shade
            } else {
                return 'border-dashed border-gray-200'
            }
        },
        panelShading(i) {
            const consistency_value = this.Store.consistency[i - 1].consistency
            for (let ind = 0; ind < this.shading.length; ind++) {
                if (consistency_value < this.shading[ind].threshold) {
                    console.log(consistency_value, this.shading[ind].color_value)
                    return this.shading[ind].color_value
                }
            }
        }
    },
    data() {
        return {
            shading: [
                { threshold: 0.2, color_value: 'bg-white' },
                { threshold: 0.4, color_value: 'bg-green-100' },
                { threshold: 0.6, color_value: 'bg-green-200' },
                { threshold: 0.8, color_value: 'bg-green-400' },
                { threshold: 1.0, color_value: 'bg-green-600' },
            ]
        }
    }
}

</script>

