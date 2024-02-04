<template>
  <TransitionRoot as="template" :show="Store.rightTrayIsOpen">
    <Dialog as="div" class="relative z-40" @close="Store.closeRightTray(); Store.rightTrayIsOpen = false">
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
                <div class="flex h-full flex-col  bg-np-base pt-3 shadow-xl rounded-l-xl">

                  <div class="flex pr-3 justify-between ml-2">

                    <button v-if="Store.rightTrayBackNavComponent" type="button"
                      class="rounded-md text-np-base hover:text-np-base"
                      @click="Store.openRightTray(Store.rightTrayBackNavComponent, Store.rightTrayBackNavProps)">
                      <span class="sr-only">Close panel</span>
                      <ChevronLeftIcon class="h-6 w-6 text-np-base " aria-hidden="true" />
                    </button>
                    <div v-else></div>
                    <button type="button" class="rounded-md text-np-base hover:text-np-base"
                      @click="Store.closeRightTray()">
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6 text-np-base " aria-hidden="true" />
                    </button>
                  </div>

                  <div v-if="Store.rightTrayIsOpen && Store.rightTrayComponentName"
                    class="relative mt-4 flex-1 px-4  mb-4 sm:px-6 overflow-auto">
                    <component :is="Store.rightTrayComponentName" v-bind="Store.rightTrayComponentProps" />
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
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import PanelTray from '@/components/panels/PanelDetails.vue'
import DailyPattern from '@/components/panels/DailyPattern.vue'
import RoutePerformanceTray from '@/components/admin/RoutePerformanceTray.vue'
import HowToGuide from '@/components/general/HowToGuide.vue'
import InstallGuide from '@/components/general/InstallGuide.vue'
import PanelCreateForm from '@/components/panels/PanelCreateForm.vue'
import Releases from '@/components/general/Releases.vue'
import About from '@/components/general/About.vue'
import PrivacyPolicy from '@/components/general/PrivacyPolicy.vue'
import SignInForm from '@/components/auth/SignInForm.vue'
import SignUpForm from '@/components/auth/SignUpForm.vue'
import PasswordResetRequestForm from '@/components/auth/PasswordResetRequestForm.vue'
import PasswordResetForm from '@/components/auth/PasswordResetForm.vue'
import PasswordResetRequestConfirm from '@/components/auth/PasswordResetRequestConfirm.vue'


export default {
  computed: {
    ...mapStores(useStore)
  },
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    DialogTitle,
    XMarkIcon,
    PanelTray,
    HowToGuide,
    PanelCreateForm,
    InstallGuide,
    RoutePerformanceTray,
    DailyPattern,
    ChevronLeftIcon,
    Releases,
    About,
    PrivacyPolicy,
    SignInForm,
    SignUpForm,
    PasswordResetRequestForm,
    PasswordResetForm,
    PasswordResetRequestConfirm
  },
}
</script>