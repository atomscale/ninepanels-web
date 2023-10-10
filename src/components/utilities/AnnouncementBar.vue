<template>
    <div v-if="Store.announcementBarActive && Store.user" class="bg-np-accent p-2 rounded-lg flex justify-between items-center">

        <button class="mr-2" @click="dispatchHideAnnoucement">
            <XMarkIcon class="h-5 w-5 text-np-inverted " />
        </button>
        <router-link :to="{ name: 'Settings' }" class="text-xs text-np-inverted">Daily pattern view now available <span class="ml-1"> 🎉</span>
        </router-link>
    </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import {
    XMarkIcon,
} from '@heroicons/vue/24/outline'

export default {
    computed: {
        ...mapStores(useStore),

    },
    methods: {
        dispatchHideAnnoucement() {
            this.Store.hideAnnouncement()
        },

    },


    components: {
        XMarkIcon
    },
}

</script>