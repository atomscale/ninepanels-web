<template >

    <div class="flex items-center justify-center mt-10 transition ease-in-out duration-700">
            <transition name="fade" appear>
            <div class="grid grid-cols-3 gap-1 w-5/12 sm:w-2/5  mx-auto">
                <div v-for="i in 9" :key="i" class="aspect-w-1 aspect-h-1 rounded-lg">

                    <div class="aspect-content">
                        <transition name="fade" appear>

                            <button @click="cycleStats()" :class="panelStyle(i)"
                                class="flex items-center justify-center rounded-lg ">
                                <!-- <transition name="fade" appear>

                                    <svg v-if="this.Store.visGridLoading"
                                        class="absolute w-5 h-5 text-gray-500 animate-spin z-50" viewBox="0 0 100 101"
                                        fill="none">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor" />
                                    </svg>
                                </transition> -->


                                    <div class="flex text-xs flex-col" v-if="this.Store.consistency[i - 1] && this.showFraction">
                                        {{ this.Store.consistency[i - 1].days_complete }}
                                        /
                                        {{ this.Store.consistency[i - 1].panel_age }}

                                    </div>



                                    <div class="flex text-xs flex-col" v-if="this.Store.consistency[i - 1] && this.showPercentage">
                                        {{ (this.Store.consistency[i - 1].consistency.toFixed(3) * 100).toFixed() }}%


                                    </div>

                            </button>
                        </transition>
                    </div>

                </div>
            </div>
        </transition>
        </div>
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
        this.Store.getPanelConsistencyAction()
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
                { threshold: 0.1, color_value: 'bg-white text-gray-500' },
                { threshold: 0.2, color_value: 'bg-green-50 text-gray-500' },
                { threshold: 0.3, color_value: 'bg-green-100 text-gray-500' },
                { threshold: 0.4, color_value: 'bg-green-200 text-gray-500' },
                { threshold: 0.5, color_value: 'bg-green-300 text-gray-500' },
                { threshold: 0.6, color_value: 'bg-green-400 text-gray-500' },
                { threshold: 0.7, color_value: 'bg-green-500 text-gray-500' },
                { threshold: 0.8, color_value: 'bg-green-600 text-gray-500' },
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

