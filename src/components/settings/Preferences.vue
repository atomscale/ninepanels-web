<template>
    <ThemeList />
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import ThemeList from '@/components/settings/ThemeList.vue'

export default {
    computed: {
        ...mapStores(useStore)
    },
    methods: {

    },

    components: {
        ThemeList
    },

}
</script>