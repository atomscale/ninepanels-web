<template >
    <div class="flex flex-col w-full  h-full justify-start  items-center relative">

        <div class="flex justify-between items-center w-40  text-xs text-np-base font-extralight">
            <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border border-np-base w-full py-1 rounded-l-md"
                :class="selected === 7 ? 'bg-np-accent border-gray-300 border text-np-inverted shadow-none scale-95' : ''"
                @click="setSelectedLimit(7)">7</button>
            <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border-r border-t border-b w-full py-1"
                :class="selected === 14 ? 'bg-np-accent border-gray-300 border text-np-inverted shadow-none scale-95' : ''"
                @click="setSelectedLimit(14)">14</button>
            <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border-t border-b w-full py-1"
                :class="selected === 30 ? 'bg-np-accent border-gray-300 border text-np-inverted shadow-none scale-95' : ''"
                @click="setSelectedLimit(30)">30</button>
            <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border rounded-r-md w-full py-0.5 text-sm"
                :class="selected === 1000 ? 'bg-np-accent  border text-np-inverted shadow-none scale-95' : ''"
                @click="setSelectedLimit(1000)">∞</button>
        </div>
        <div class="grid grid-cols-7 gap-1 mt-2">

            <div class="text-np-base font-light pl-2 text-sm w-8" v-for="d in dayHeadings" :key="d">{{ d }}</div>
        </div>
        <div ref="scrollableDiv"

        class="flex flex-col h-full pb-6 justify-start items-center overflow-scroll ">

            <div class="">

                <div v-if="this.entries" dir="rtl" class="grid grid-cols-7 gap-1 mt-1 ">
                    <div v-for="entry in this.entries_by_day.slice(0, this.limit)" :key="entry.id">
                        <div v-if="entry.id" class="h-8 w-8 border rounded-md text-xs"
                            :class="entry.is_complete ? 'bg-green-300 scale-105' : 'bg-np-base border-np-base border-2 scale-95' "></div>
                        <!-- <div v-else class="h-7 w-7 ">

                        </div> -->
                    </div>
                </div>
            </div>
            <div v-if="showEllipsis" class="flex justify-center bg-np-base">
                <div class=" absolute -bottom-4 text-2xl text-gray-200 ">. . .</div>
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
        panelId: {
            type: Number,
            required: true
        }
    },
    watch: {
        panelId(new_val, old_val) {
            this.getEntries()
        }
    },
    methods: {
        async getEntries() {
            this.entries_by_day = await this.Store.readEntriesAction(this.panelId)
            if (this.entries_by_day) {
                console.log("entries pre pad", this.entries_by_day)
                this.padEntries()
                console.log("entries post pad", this.entries_by_day)
            }
            // this.$nextTick(() => {
            //     this.checkScroll();
            // });

        },
        setSelectedLimit(value) {
            this.selected = value
            this.limit = value
            // this.getEntries()
        },
        padEntries() {
            const today = new Date()
            const currentDayOfWeek = today.getDay()
            const missingDays = 6 - currentDayOfWeek
            console.log(currentDayOfWeek, missingDays)

            for (let i = 0; i <= missingDays; i++) {
                this.entries_by_day.unshift({ id: null, is_complete: false, timestamp: null, panel_id: null })
            }
        },
        // checkScroll() {
        //     const element = this.$refs.scrollableDiv
        //     if (!element) {
        //         console.error("Element not found")
        //         return
        //     }
        //     if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        //         this.showEllipsis = false
        //     } else {
        //         this.showEllipsis = true
        //     }
        // },

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
            offset: null,
            selected: 1000,
            limit: 1000,
            dayHeadings: ['m', 't', 'w', 't', 'f', 's', 's'],
            showEllipsis: false
        }
    }

}

</script>

