<template >
    <div :class="{ 'opacity-70': Store.theme === 'night' }">
        <div class=" flex flex-col justify-center items-center relative">
            <button @click="toggleVisGrid">
                <!-- class="animate-visgrid-bounce flex w-full justify-between items-center pt-6 pl-3 pr-2 pb-3"> -->

                <!-- <div class="h-5 text-np-base" :class="{ 'font-semibold text-np-base': this.Store.isPWA, 'font-light text-sm': !this.Store.isPWA}">Consistency</div> -->
                <div class="absolute -top-2 right-0">
                    <ChevronDownIcon v-if="Store.visGridIsOpen" class="h-6 w-6 pr-1 text-np-base"></ChevronDownIcon>
                </div>
            </button>

            <div v-if="Store.visGridIsOpen" class="grid grid-cols-3 gap-1 w-5/12 sm:w-2/5  mx-auto">
                <div v-for="i in 9" :key="i" class="rounded-lg">
                    <div class="aspect-content">
                        <button @click="visGridTap(i)" :class="panelStyle(i)"
                            class="flex items-center justify-center rounded-lg ">
                            <div class="flex text-xs flex-col" :class="!Store.visGridIsOpen ? 'hidden' : ''"
                                v-if="this.Store.consistency[i - 1] && this.showFraction">
                                {{ this.Store.consistency[i - 1].days_complete }}
                                /
                                {{ this.Store.consistency[i - 1].panel_age }}
                            </div>
                            <div class="flex text-xs flex-col" :class="!Store.visGridIsOpen ? 'hidden' : ''"
                                v-if="this.Store.consistency[i - 1] && this.showPercentage">
                                {{ (this.Store.consistency[i - 1].consistency.toFixed(3) * 100).toFixed() }}%
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="grid grid-cols-3 gap-1 w-5/12 sm:w-2/5  mx-auto">
                <div v-for="i in 9" :key="i" class="rounded-lg">
                    <div class="aspect-content">
                        <button @click="visGridTap(i)"
                            class="flex items-center justify-center rounded-2xl opacity-90"
                            :class=" Store.theme === 'night' ? 'bg-gray-100' : 'bg-np-fill' ">

                        </button>
                    </div>
                </div>
            </div>

            <div class="flex justify-between mt-4 items-center w-40  text-xs text-np-base font-extralight"
                :class="!Store.visGridIsOpen ? 'hidden' : ''">
                <button
                    class="hover:bg-np-accent h-7 hover:text-np-inverted transition shadow-sm duration-200 border border-np-base w-full py-1 rounded-l-md"
                    :class="!this.showFraction && !this.showPercentage ? 'bg-np-accent border-gray-300 border text-np-inverted shadow-none scale-95' : ''"
                    @click="selectBlank"> </button>
                <button
                    class="hover:bg-np-accent h-7 hover:text-np-inverted transition shadow-sm duration-200 border-np-base border-r border-t border-b w-full py-1"
                    :class="this.showFraction && !this.showPercentage ? 'bg-np-accent border-gray-300 border text-np-inverted shadow-none scale-95' : ''"
                    @click="selectFraction">a / b</button>
                <button
                    class="hover:bg-np-accent h-7 hover:text-np-inverted transition shadow-sm duration-200 border-np-base border-t border-b border-r rounded-r-md w-full py-1"
                    :class="!this.showFraction && this.showPercentage ? 'bg-np-accent border-gray-300 border text-np-inverted shadow-none scale-95' : ''"
                    @click="selectPercentage">%</button>
            </div>
        </div>
    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'


export default {
    computed: {
        ...mapStores(useStore),

    },
    components: {
        ChevronUpIcon,
        ChevronDownIcon
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
                return 'border-2 border-dashed border-gray-300'
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
        selectBlank() {
            this.showFraction = false
            this.showPercentage = false
        },
        selectFraction() {
            this.showFraction = true
            this.showPercentage = false
        },
        selectPercentage() {
            this.showFraction = false
            this.showPercentage = true
        },
        toggleVisGrid() {
            this.Store.visGridIsOpen = !this.Store.visGridIsOpen
        },
        visGridTap(i) {

            if (!this.Store.visGridIsOpen) {
                this.toggleVisGrid()
            } else {
                const panelId = this.Store.consistency[i - 1].panel_id
                console.log("fire to visTray here", panelId)
                this.Store.primaryTrayIsOpen = true
                this.Store.primaryComponentName = 'PatternTray'
                this.Store.primaryComponentProps = { panelId: panelId }

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

