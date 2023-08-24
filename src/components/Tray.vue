<template>
  <TransitionRoot as="template" :show="this.Store.trayIsOpen">
    <Dialog as="div" class="relative z-10" @close="this.clearTrayState(); this.Store.trayIsOpen = false">
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
                <div class="flex h-full flex-col  bg-white pt-4 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900">
                      </DialogTitle>
                      <div class="ml-3 flex h-5  items-center">
                        <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                          @click="this.clearTrayState(); this.Store.trayIsOpen = false">
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-if="this.Store.trayIsOpen && this.Store.componentName" class="relative mt-4 flex-1 px-4 sm:px-6 overflow-auto">
                    <component :is="this.Store.componentName" v-bind="this.Store.componentProps" />
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
import PanelCreateForm from '@/components/PanelCreateForm.vue'

// const store = useStore()

export default {
  computed: {
    ...mapStores(useStore)
  },
  methods: {
    clearTrayState() {
      this.Store.componentName = null
      this.Store.componentProps = {}
      this.Store.panelTitleEditState = false
      this.Store.panelDescEditState = false
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
    PanelCreateForm
  }
}
</script>