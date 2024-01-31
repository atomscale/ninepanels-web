<template>
  <TransitionRoot as="template" :show="Store.leftNavIsOpen">
    <Dialog as="div" class="relative z-50 " @close="this.Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
        enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75 " />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex ">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col " :class="Store.theme">


            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
              leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute right-0 -mr-12 pt-2" :class="Store.isPWA ? 'bottom-6': 'bottom-1 '">
                <button aria-label="Close sidebar" type="button"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full"
                  @click="this.Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-8 w-8 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>

            <div class="flex flex-col justify-between h-full bg-np-fill rounded-r-xl">
              <LeftTrayTop />
              <LeftTrayBottom />
            </div>

          </DialogPanel>

        </TransitionChild>
        <div class="w-14 flex-shrink-0">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import LeftTrayBottom from '@/components/navigation/LeftTrayBottom.vue'
import LeftTrayTop from '@/components/navigation/LeftTrayTop.vue'

import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import {
  XMarkIcon,
} from '@heroicons/vue/24/outline'


export default {
  computed: {
    ...mapStores(useStore),
  },
  components: {
    LeftTrayBottom,
    LeftTrayTop,
    XMarkIcon,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
  }
}

</script>