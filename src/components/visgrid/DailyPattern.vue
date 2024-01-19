<template >
    <div class="flex flex-col w-full  justify-start  items-center relative">
        <div v-if="entries_by_day" class="flex justify-center items-center mb-2 w-full font-bold">
            <div class="text-np-base ml-2 mr-6">{{ daysCompleted() }} / {{ numDays() }}</div>
            <div class="text-np-base mr-2">{{ ((daysCompleted() / numDays()) * 100).toFixed(0) }}%</div>
        </div>
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
                @click="infinityToggle()">∞</button>
        </div>
        <div class="grid grid-cols-7 gap-0.5 mt-2">
            <div class="text-np-base  pl-3 text-sm w-8" v-for="d in dayHeadings" :key="d">{{ d }}</div>
        </div>
        <div class="flex flex-col h-full pb-6 justify-start items-center overflow-y-scroll overflow-x-hidden relative">
            <div ref="scrollableDiv" @scroll="checkScroll" v-if="this.entries_by_day" dir="rtl"
                class="grid grid-cols-7 gap-0.5 ">
                <div v-for="entry in entries_by_day.slice(0, limit + missingDays() + 1)" :key="entry.id">
                    <div v-if="entry.id" class="h-8 w-8 border rounded-md text-xs"
                        :class="entry.is_complete ? 'bg-np-fill ' : 'bg-np-base border-np-base border-2 scale-95'">
                    </div>
                </div>
            </div>
            <div v-if="showEllipsis" class="flex justify-center bg-np-base">
                <div class=" absolute -bottom-4 z-50 text-2xl text-gray-200 ">. . .</div>
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
            required: true
        },
        onHome: {
            required: true,
            type: Boolean
        }
    },
    watch: {
        panelId(new_val, old_val) {
            this.getEntries()
        },
        'Store.panels': function (new_val, old_val) {
            this.getEntries()
        }
    },
    methods: {
        async getEntries() {
            this.entries_by_day = await this.Store.readEntriesAction(this.panelId)
            if (this.entries_by_day) {
                // console.log("entries pre pad", this.entries_by_day)
                this.padEntries()
                // console.log("entries post pad", this.entries_by_day)
            }
            this.$nextTick(() => {
                this.checkScroll();
            });


        },
        async getConsistency() {
            await this.Store.readPanelConsistencyAction()
        },
        daysCompleted() {
            if (this.entries_by_day) {

                const trimmedEntriesByDay = this.entries_by_day.slice(0, this.limit + this.missingDays() + 1)

                const arrayOfCompleted = trimmedEntriesByDay.filter(completedEntry => completedEntry.is_complete === true)
                return arrayOfCompleted.length
                // return 6
            }
        },
        numDays() {
            const paddedLen = this.entries_by_day.slice(0, this.limit + this.missingDays() + 1)
            const actualLen = paddedLen.filter(actualEntry => actualEntry.id != null).length

            return actualLen
        },
        setSelectedLimit(value) {
            this.selected = value
            this.limit = value
            // this.getEntries()
        },
        missingDays() {
            const today = new Date()
            const currentDayOfWeek = today.getDay()
            const missingDays = 6 - currentDayOfWeek
            return missingDays
        },
        padEntries() {

            const missingDays = this.missingDays()
            for (let i = 0; i <= missingDays; i++) {
                this.entries_by_day.unshift({ id: null, is_complete: false, timestamp: null, panel_id: null })
            }

            return missingDays
        },
        checkScroll() {
            const element = this.$refs.scrollableDiv
            if (!element) {
                console.error("Element not found")
                return
            }
            if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
                this.showEllipsis = false
            } else {
                this.showEllipsis = true
            }
        },
        togglePatternTray() {
            this.Store.primaryTrayIsOpen = false
            this.Store.primaryComponentName = ''
            this.Store.primaryComponentProps = ''
            this.Store.primaryTrayIsOpen = true
            this.Store.primaryComponentName = 'PatternTray'
            this.Store.primaryComponentProps = { panelId: this.panelId }
        },
        infinityToggle() {
            if (this.onHome === true) {
                console.log("at home not tray")
                this.togglePatternTray()
            } else {
                console.log("not on home, must be tray")
                this.setSelectedLimit(1000)
            }
        },
        setLocationAwareLimit() {
            if (this.onHome === true) {
                console.log("at home not tray")
                this.setSelectedLimit(30)
            } else {
                console.log("not on home, must be tray")
                this.setSelectedLimit(1000)
            }
        }

    },
    components: {

    },
    mounted() {
        this.getEntries()
        this.getConsistency()
        this.setLocationAwareLimit()
    },
    data() {
        return {
            entries_by_day: [],
            sort_key: null,
            sort_direction: null,
            offset: null,
            selected: 30,
            limit: 30,
            dayHeadings: ['m', 't', 'w', 't', 'f', 's', 's'],
            showEllipsis: false
        }
    }

}

</script>

