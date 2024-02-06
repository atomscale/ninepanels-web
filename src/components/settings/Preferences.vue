<template>
    <ThemeList />
</template>

<script>

import { useMainStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import ThemeList from '@/components/settings/ThemeList.vue'

export default {
    computed: {
        ...mapStores(useMainStore)
    },
    methods: {

    },

    components: {
        ThemeList
    },

}
</script>