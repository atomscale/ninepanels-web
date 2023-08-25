<template >
    <div class="flex items-center justify-center p-4 ">
        <div class="grid grid-cols-3 gap-1 md:w-2/5 mx-auto">
            <div v-for="i in 9" :key="i" class="aspect-w-1 aspect-h-1 rounded-lg">
                <div class="aspect-content">
                    <button @click="showIndex(i)"
                        class="flex items-center justify-center text-gray-500 border border-dashed border-gray-300 text-sm rounded-lg">
                    </button>
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
    components: {

    },
    props: {
        panelId: {
            type: Number,
            required: true
        }
    },
    methods: {
        showIndex(i) {
            console.log(i)
        }
    }

}

</script>

<style scoped>
.aspect-content {
    position: relative;
    width: 100%;
}

.aspect-content::before {
    content: "";
    display: block;
    padding-top: 100%;
}

.aspect-content>* {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
</style>