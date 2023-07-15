<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 " @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">


              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full "
                    @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <div class="h-0 flex-1 overflow-y-auto pt-5 ">
                <router-link @click="this.sidebarOpen = false" :to="{ name: 'Landing' }"><img class="h-7 ml-5 w-auto"
                    src="@/assets/9p-logo-empty.png" alt="9P logo" /></router-link>
                <div class="m-2 mt-3 space-y-1" aria-labelledby="projects-headline">
                  <router-link v-if="this.mainStore.user" @click="this.sidebarOpen = false" :to="{ name: 'Daily' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <CalendarIcon class="h-6 w-6" /><span class="ml-3">Daily</span>
                  </router-link>
                </div>
              </div>

              <div class="mt-8">
                <div class="m-2 space-y-1" aria-labelledby="projects-headline">
                  <router-link @click="this.sidebarOpen = false" :to="{ name: 'Why' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <QuestionMarkCircleIcon class="h-6 w-6" /><span class="ml-3">Why Link</span>
                  </router-link>
                  <router-link v-if="this.mainStore.user" @click="this.sidebarOpen = false" :to="{ name: 'Account' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <UserCircleIcon class="h-6 w-6" /><span class="ml-3">Account</span>
                  </router-link>
                  <router-link v-if="this.mainStore.user" @click="this.signUserOut()" :to="{ name: 'Landing' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <ArrowLeftOnRectangleIcon class="h-6 w-6" /><span class="ml-3">Sign Out</span>
                  </router-link>
                  <router-link v-if="!this.mainStore.user" @click="this.sidebarOpen = false" :to="{ name: 'SignIn' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <ArrowRightOnRectangleIcon class="h-6 w-6" /><span class="ml-3">Sign In</span>
                  </router-link>

                </div>
              </div>


            </DialogPanel>

          </TransitionChild>
          <div class="w-14 flex-shrink-0">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>


    <div class="flex flex-col items-center w-full">
      <div class="sticky top-0 bg-gray-800 pl-1 pt-1 sm:pl-3 sm:pt-3 w-full ">
        <div class="flex justify-between">
          <button type="button"
            class="-ml-0.5 -mt-0.5 flex h-12 items-center   justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none "
            @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <img class="h-7 ml-3 mb-1" src="@/assets/9p-logo-empty.png" alt="9P logo" />
          </button>
          <button v-if="this.mainStore.user" type="button" class="text-blue-300 mb-1 mr-4"
            @click="this.sendOpenSlideover()">

            <ChartBarSquareIcon class="text-gray-300 h-6 w-6" />

          </button>
        </div>
      </div>
      <main class="max-w-lg h-screen w-full">
        <!-- Replace with your content -->


        <RouterView />


        <SlideOver />

        <!-- /End replace -->

      </main>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/mainStore.js'
// import VerifyInput from '@/components/VerifyInput.vue'
import FlashMessage from '@/components/FlashMessage.vue'
import DailyPanelFrame from '@/components/DailyPanelFrame.vue'
import SlideOver from '@/components/SlideOver.vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  Bars3Icon,
  CalendarIcon,
  CalendarDaysIcon,
  ChartBarSquareIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  BookOpenIcon,
  UsersIcon,
  XMarkIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon,
  CalculatorIcon,
  BeakerIcon
} from '@heroicons/vue/24/outline'



import { mapStores } from 'pinia'


export default {
  data() {
    return {
      sidebarOpen: false
    }
  },
  computed: {
    ...mapStores(useMainStore),
  },



  methods: {
    signUserOut() {
      this.mainStore.signUserOutAction()
      this.sidebarOpen = false
      this.$router.push({ name: "Landing" })
      this.mainStore.messages.push({ message: "Signed out" })
      setTimeout(() => this.mainStore.messages.shift(), 5000)
    },
    sendOpenSlideover() {
      this.mainStore.slideover = true
    }
  },
  components: {
    Bars3Icon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    BookOpenIcon,
    UsersIcon,
    XMarkIcon,
    UserCircleIcon,
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon,
    ChartBarSquareIcon,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    QuestionMarkCircleIcon,
    FlashMessage,
    DailyPanelFrame,
    SlideOver
  }
}

</script>