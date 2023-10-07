<template>
  <transition name="fade" appear>
    <div class="flex flex-col justify-between w-full h-full">
      <div>
        <PanelGridFrame />
      </div>
      <div class="h-full flex flex-col justify-end" >
        <div :class="!Store.visGridIsOpen ? 'scale-vis h-20 visgrid-bounce' : 'mb-4'">
        <!-- <div class="flex flex-col w-full justify-end h-full " :class="{'mt-14': !Store.visGridIsOpen}" > -->

          <ConsistencyGrid />

        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import PanelGridFrame from '@/components/panels/grid/PanelGridFrame.vue'
import ConsistencyGrid from '@/components/visgrid/ConsistencyGrid.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {

  },
  components: {
    PanelGridFrame,
    ConsistencyGrid,
    ChevronDownIcon,
    ChevronUpIcon
  },
}
</script>