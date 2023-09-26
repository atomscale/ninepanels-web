<template>
  <div class="flex px-4 flex-col  justify-between h-full mt-5">

    <div>
      <div class=" border-b border-np-base "></div>
      <button @click="toggleRoutePerfBox()" class="flex w-full justify-between items-center mb-5">
        <div class="text-base sm:text-sm font-semibold h-5 text-np-base mt-4">Route performance</div>
        <div>
          <ChevronLeftIcon v-if="!routePerfBoxIsOpen" class="h-5 w-5 text-np-base mt-4"></ChevronLeftIcon>
          <ChevronDownIcon v-else class="h-5 w-5 text-np-base mt-4"></ChevronDownIcon>
        </div>
      </button>
      <div>
        <RoutePerformance class="  mb-5" v-if="routePerfBoxIsOpen" />
      </div>
    </div>

</div>


</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import RoutePerformance from '@/components/admin/RoutePerformance.vue'

import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore)
  },
  methods: {
    toggleRoutePerfBox() {
      this.routePerfBoxIsOpen = !this.routePerfBoxIsOpen
    },
  },
  components: {
    ChevronDownIcon,
    ChevronLeftIcon,
    RoutePerformance
  },
  data() {
    return {
      routePerfBoxIsOpen: true,
    }
  }
}
</script>

