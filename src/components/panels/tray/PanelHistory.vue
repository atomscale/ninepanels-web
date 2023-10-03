<template >
    <div class="flex flex-col w-full justify-start overflow-scroll items-center">

        <div class="flex justify-between items-center w-40  text-xs text-np-base font-extralight">
            <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border w-full py-1 rounded-l-md"
                :class="selected === 7 ? 'bg-np-accent border-white border text-np-inverted shadow-none scale-95' : ''"
                @click="setSelectedLimit(7)">7</button>
            <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border-r border-t border-b w-full py-1"
                :class="selected === 14 ? 'bg-np-accent border-white border text-np-inverted shadow-none scale-95' : ''"
                @click="setSelectedLimit(14)">14</button>
            <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border-t border-b w-full py-1"
                :class="selected === 30 ? 'bg-np-accent border-white border text-np-inverted shadow-none scale-95' : ''"
                @click="setSelectedLimit(30)">30</button>
            <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border rounded-r-md w-full py-0.5 text-sm"
                :class="selected === null ? 'bg-np-accent border-white border text-np-inverted shadow-none scale-95' : ''"
                @click="setSelectedLimit(null)">∞</button>
        </div>
        <div class="flex flex-col justify-center items-center">

            <div  class="grid grid-cols-7 gap-1 mt-4">

                <div class="text-gray-300 font-extralight pl-2 text-xs w-6" v-for="d in dayHeadings" :key="d">{{ d }}</div>
            </div>
            <div dir="rtl" class="grid grid-cols-7 gap-1 mt-1">
                <div v-for="entry in this.entries" :key="entry.id">
                    <div v-if="entry.id" class="h-6 w-6 border rounded-md"
                        :class="entry.is_complete ? 'bg-green-200' : 'bg-np-base border-np-base'"></div>
                    <div v-else class="h-6 w-6 "></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'



export default {
    computed: {
        ...mapStores(useStore),

    },
    props: {
        panel: {
            type: Object,
            required: true
        }
    },
    methods: {
        async getEntries() {
            this.entries = await this.Store.readEntriesAction(this.panel.id, this.limit)
            if (this.entries) {
                this.padEntries()
            }
        },
        setSelectedLimit(value) {
            this.selected = value
            this.limit = value
            this.getEntries()
        },
        padEntries() {
            const today = new Date()
            const currentDayOfWeek = today.getDay()
            const missingDays = 6 - currentDayOfWeek
            console.log(currentDayOfWeek, missingDays)

            for (let i = 0; i <= missingDays; i++) {
                this.entries.unshift({ id: null, is_complete: false, timestamp: null, panel_id: null })
            }
        }

    },
    components: {

    },
    mounted() {
        this.getEntries()
    },
    data() {
        return {
            entries: [],
            sort_key: null,
            sort_direction: null,
            limit: null,
            offset: null,
            selected: null,
            dayHeadings: ['m', 't', 'w', 't', 'f', 's', 's']
        }
    }

}

</script>

