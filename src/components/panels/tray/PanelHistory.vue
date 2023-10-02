<template >

        <div class="flex justify-center items-center">

            <div class="flex justify-between items-center w-40  text-xs text-np-base font-extralight">
                <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border w-full py-1 rounded-l-md"
                :class="selected === 7 ? 'bg-np-accent border-white text-np-inverted shadow-none scale-95': ''"
                @click="setSelectedLimit(7)"
                >7</button>
                <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border-r border-t border-b w-full py-1"
                :class="selected === 14 ? 'bg-np-accent border-white text-np-inverted shadow-none scale-95': ''"
                @click="setSelectedLimit(14)"
                >14</button>
                <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border-t border-b w-full py-1"
                :class="selected === 30 ? 'bg-np-accent border-white text-np-inverted shadow-none scale-95': ''"
                @click="setSelectedLimit(30)"
                >30</button>
                <button
                class="hover:bg-np-accent hover:text-np-inverted transition shadow-sm duration-200 border-np-base border rounded-r-md w-full py-0.5 text-sm"
                :class="selected === null ? 'bg-np-accent border-white text-np-inverted shadow-none scale-95': ''"
                @click="setSelectedLimit(null)"
                >∞</button>
            </div>
        </div>

        <div class="grid grid-cols-7 gap-1 w-3/5 mx-auto mt-4">
            <div v-for="entry in this.entries" :key="entry.id">
                <div class="h-5 w-5 border rounded-md" :class="!entry.is_complete ? 'bg-green-200' : 'bg-white'"></div>
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
        },
        setSelectedLimit(value) {
            this.selected = value
            this.limit = value
            this.getEntries()
        }
    },
    components: {

    },
    mounted() {
        this.getEntries()
    },
    data() {
        return {
            entries: null,
            sort_key: null,
            sort_direction: null,
            limit: null,
            offset: null,
            selected: null
        }
    }

}

</script>

