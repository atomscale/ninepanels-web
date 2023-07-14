<template>
    <div>something about why</div>
</template>

<script>

import { useMainStore } from '@/stores/mainStore.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
}
</script>