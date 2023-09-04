<template>
  <TransitionRoot as="template" :show="this.Store.primaryTrayIsOpen">
    <Dialog as="div" class="relative z-40" @close="this.closePrimaryTray(); this.Store.primaryTrayIsOpen = false">
      <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75 " />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-300 sm:duration-300"
              enter-from="translate-x-full" enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-300" leave-from="translate-x-0"
              leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col  bg-white pt-3 shadow-xl">

                  <div class="flex px-5 justify-between">
                    <div></div>
                    <button type="button" class="rounded-md text-gray-400 hover:text-gray-500"
                      @click="this.closePrimaryTray(); this.Store.primaryTrayIsOpen = false">
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div v-if="this.Store.primaryTrayIsOpen && this.Store.primaryComponentName"
                    class="relative mt-4 flex-1 px-4 pt-1 sm:px-6 overflow-auto">
                    <component :is="this.Store.primaryComponentName" v-bind="this.Store.primaryComponentProps" />
                  </div>


                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>



<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import PanelDetail from '@/components/PanelDetail.vue'
import HelpDetail from '@/components/HelpDetail.vue'
import PanelCreateForm from '@/components/PanelCreateForm.vue'
import Welcome from '@/components/Welcome.vue'

// const store = useStore()

export default {
  computed: {
    ...mapStores(useStore)
  },
  methods: {
    closePrimaryTray() {
      this.Store.primaryComponentName = null
      this.Store.primaryComponentProps = {}
      this.Store.panelTitleEditState = false
      this.Store.panelDescEditState = false
      this.Store.panelSortBoxIsOpen = false
      this.Store.deleteResetBoxIsOpen = false
    }
  },
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    DialogTitle,
    XMarkIcon,
    PanelDetail,
    HelpDetail,
    PanelCreateForm,
    Welcome
  }
}
</script>