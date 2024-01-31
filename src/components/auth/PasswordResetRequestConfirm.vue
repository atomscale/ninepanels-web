<template>
    <div class="flex min-h-full flex-col justify-between  ">

        <div class="font-bold text-xl text-np-base">
            An email is winging it's way to you now.
            <div class="flex justify-center">
                <CheckBadgeIcon class="h-28 text-green-600" />

            </div>
            <div class="text-sm font-light mt-2">Click the link within ten minutes.</div>
        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useStore } from '@/stores/store.js'

import { CheckBadgeIcon } from '@heroicons/vue/24/outline'



export default {

    computed: {
        ...mapStores(useStore)
    },
    methods: {

    },
    components: {

        CheckBadgeIcon
    }

}

</script>