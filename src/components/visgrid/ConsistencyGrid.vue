<template >
        <transition name="fade" appear>
            <div class="grid grid-cols-3 gap-1 w-5/12 sm:w-2/5  mx-auto" :class="{'opacity-50': Store.theme === 'night'}">
                <div v-for="i in 9" :key="i" class="aspect-w-1 aspect-h-1 rounded-lg">
                    <div class="aspect-content">
                        <transition name="fade" appear>
                            <button aria-label="Cycle through consistency stats" @click="cycleStats()" :class="panelStyle(i)"
                                class="flex items-center justify-center rounded-lg ">
                                <div class="flex text-xs flex-col"
                                    v-if="this.Store.consistency[i - 1] && this.showFraction">
                                    {{ this.Store.consistency[i - 1].days_complete }}
                                    /
                                    {{ this.Store.consistency[i - 1].panel_age }}
                                </div>
                                <div class="flex text-xs flex-col"
                                    v-if="this.Store.consistency[i - 1] && this.showPercentage">
                                    {{ (this.Store.consistency[i - 1].consistency.toFixed(3) * 100).toFixed() }}%
                                </div>
                            </button>
                        </transition>
                    </div>

                </div>
            </div>
        </transition>

</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'



export default {
    computed: {
        ...mapStores(useStore),

    },
    components: {

    },
    mounted() {
        this.Store.readPanelConsistencyAction()
    },
    methods: {
        panelStyle(i) {
            if (this.Store.consistency[i - 1]) {
                const shade = this.panelShading(i)
                const format = 'border border-1 border-gray-300 transition ease-in-out duration-700'
                return format + ' ' + shade
            } else {
                return 'border border-dashed border-gray-300'
            }
        },
        panelShading(i) {
            const consistency_value = this.Store.consistency[i - 1].consistency
            for (let ind = 0; ind < this.shading.length; ind++) {
                if (consistency_value <= this.shading[ind].threshold) {
                    return this.shading[ind].color_value
                }
            }
        },
        cycleStats() {
            if (this.cycleCounter === 0) {
                this.showFraction = !this.showFraction
                this.cycleCounter++
            } else if (this.cycleCounter === 1) {
                this.showFraction = !this.showFraction
                this.showPercentage = !this.showPercentage
                this.cycleCounter++
            } else {
                this.showPercentage = !this.showPercentage
                this.cycleCounter = 0
            }
        }
    },
    data() {
        return {
            shading: [
                { threshold: 0.1, color_value: 'bg-np-base text-gray-500' },
                { threshold: 0.2, color_value: 'bg-green-50 text-gray-500' },
                { threshold: 0.3, color_value: 'bg-green-100 text-gray-500' },
                { threshold: 0.4, color_value: 'bg-green-200 text-gray-500' },
                { threshold: 0.5, color_value: 'bg-green-300 text-gray-500' },
                { threshold: 0.6, color_value: 'bg-green-400 text-gray-500' },
                { threshold: 0.7, color_value: 'bg-green-500 text-gray-500' },
                { threshold: 0.8, color_value: 'bg-green-600 text-white' },
                { threshold: 0.9, color_value: 'bg-green-700 text-white' },
                { threshold: 1.0, color_value: 'bg-green-700 text-white' },
            ],
            showFraction: false,
            showPercentage: false,
            cycleCounter: 0
        }
    }
}

</script>

