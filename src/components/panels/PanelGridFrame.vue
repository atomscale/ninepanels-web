<template>
  <div v-if="panelStore.panels">
    <transition name="fade" appear>

      <div class="grid grid-cols-3 gap-2 px-2 pt-2 md:px-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
        <div v-for="i in 9" :key="i" class="aspect-w-1 aspect-h-1 rounded-lg">
          <div class="aspect-content">

            <Panel v-if="panelStore.panels[i - 1]" :panel="panelStore.panels[i - 1]" />
            <PanelGridAdd v-else-if="panelStore.panels.length == (i - 1)" :slotIndex="(i - 1)" />
            <div v-else
              class="flex items-center justify-center text-np-base border border-dashed border-np-base text-sm rounded-lg">
            </div>

          </div>
        </div>
      </div>
    </transition>
  </div>
  <div v-else class="mt-56">
    <LoaderSpin :height="6" :width="6"/>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { usePanelStore } from "@/stores/panelStore.js"

import { mapStores } from 'pinia'
import Panel from '@/components/panels/Panel.vue'
import PanelGridAdd from '@/components/panels/PanelGridAdd.vue'
import LoaderSpin from '@/components/general/LoaderSpin.vue'


export default {
  computed: {
    ...mapStores(useStore, usePanelStore),
  },
  mounted() {
    this.panelStore.readPanelsAction()
  },
  components: {
    Panel,
    PanelGridAdd,
    LoaderSpin
  },

}

</script>
