<template >
  <div class="relative">

    <div class="flex justify-between w-full">
      <div ref="scrollableDiv" class="overflow-scroll w-full" @scroll="checkScroll">

        <VueShowdown v-if="this.panel.description"
          class="text-sm mr-2 max-h-64 font-light text-np-base w-full whitespace-pre-line " flavor="vanilla"
          :options="{ emoji: true }" :markdown="this.panel.description">
        </VueShowdown>
        <div v-else class="italic font-extralight text-gray-400 text-sm">Why is this important to you?</div>
      </div>
      <div>
        <button class="" @click="toggleEditState()">
          <PencilIcon v-if="this.panel.description" class="h-4 w-4 text-gray-400 hover:text-np-base" />
          <PlusIcon v-else class="h-5 w-5 text-gray-400 hover:text-np-base" />
        </button>
      </div>
    </div>
    <div v-if="showEllipsis" class="flex justify-center  transition-all duration-500">
      <div class=" absolute -bottom-3 text-2xl text-gray-300 mr-6 ">. . .</div>
    </div>


  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { VueShowdown } from 'vue-showdown'

import {
  PencilIcon,
  ArrowDownCircleIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),
    panel() {
      return this.Store.panels.find(panel => panel.id === this.panelId)
    }
  },
  methods: {
    toggleEditState() {
      this.Store.panelDescEditState = !this.Store.panelDescEditState
    },
    checkScroll() {
      const element = this.$refs.scrollableDiv
      if (!element) {
        console.error("Element not found");
        return;
      }
      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        this.showEllipsis = false
      } else {
        this.showEllipsis = true
      }
    },
  },
  components: {
    PencilIcon,
    PlusIcon,
    ArrowDownCircleIcon,
    VueShowdown
  },
  data() {
    return {
      showEllipsis: false
    }
  },
  mounted() {
    this.checkScroll()
  },
  props: {
    description: {
      type: String,
      required: false
    },
    panelId: {
      type: Number,
      required: true
    }
  }

}

</script>