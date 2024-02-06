<template>
  <div class="flex px-4 flex-col  justify-between h-full mt-5">

    <div class=" border-b border-np-base">
      <div class="flex w-full justify-between items-center mb-5">

        <div class="text-base sm:text-sm font-semibold h-5 text-np-base mt-4">Route performance</div>
        <div class="flex">
          <button @click="readRoutePerformance">

            <ArrowPathIcon class="h-4 w-4 text-np-base mt-4 mr-3 " />
          </button>
          <button @click="toggleRoutePerfBox()" class="">
            <ChevronLeftIcon v-if="!routePerfBoxIsOpen" class="h-5 w-5 text-np-base mt-4"></ChevronLeftIcon>
            <ChevronDownIcon v-else class="h-5 w-5 text-np-base mt-4"></ChevronDownIcon>
          </button>
        </div>
      </div>
      <div>
        <RoutePerformance v-if="mainStore.routePerformance && routePerfBoxIsOpen" class="  mb-5" />
      </div>
    </div>

  </div>
</template>

<script>

import { useMainStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import RoutePerformance from '@/components/admin/RoutePerformance.vue'

import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
  methods: {
    toggleRoutePerfBox() {
      this.routePerfBoxIsOpen = !this.routePerfBoxIsOpen
    },
    async readRoutePerformance() {
      await this.mainStore.readRoutePerformance()
    },
  },
  components: {
    ChevronDownIcon,
    ChevronLeftIcon,
    RoutePerformance,
    ArrowPathIcon
  },
  mounted() {
    this.readRoutePerformance()
  },
  data() {
    return {
      routePerfBoxIsOpen: true,
    }
  }
}
</script>

