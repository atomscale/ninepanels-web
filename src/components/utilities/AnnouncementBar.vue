<template>
    <div class="bg-np-accent p-2 rounded-lg flex justify-between items-center">

        <button class="mr-2" @click="hideAnnouncement">
            <XMarkIcon class="h-5 w-5 text-np-inverted " />
        </button>
        <router-link :to="{ name: 'Settings' }" class="text-xs text-np-inverted">Themes now available! <span class="ml-1"> 🎉</span>
        </router-link>
    </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import rollbar from '@/rollbarClient.js'

import {
    XMarkIcon,
} from '@heroicons/vue/24/outline'

export default {
    computed: {
        ...mapStores(useStore),

    },
    methods: {
        hideAnnouncement() {
            this.Store.canShow = false
            localStorage.setItem('hiddenAnnoucementVersion', this.Store.currentAnnouncementVersion)
            rollbar.info(`${this.Store.user.name} hid the announcement version ${this.Store.currentAnnouncementVersion}`)
        },
    },


    components: {
        XMarkIcon
    },
}

</script>