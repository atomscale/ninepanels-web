<template>
  <!--
      This example requires updating your template:

      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    -->
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">

              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <!-- <div class="flex flex-shrink-0 items-center px-4">
                  <img class="h-8 w-auto" src="src/assets/hydrogen-logo-base-blue.png" alt="Hydrogen Web" />
                  <div class="text-gray-300 pl-2 pt-1 font-bold">9P</div>
                </div> -->

                <nav class="mt-5 space-y-1 px-2">
                  <a v-for="item in navigation" :key="item.name" :href="item.href"
                    :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                    <component :is="item.icon"
                      :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-4 flex-shrink-0 h-6 w-6']"
                      aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </nav>
              </div>

              <div class="mt-8">
                <div class="m-2 space-y-1" aria-labelledby="projects-headline">
                  <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href" @click="item.action"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <component :is="item.icon" class="truncate h-6 w-6 mr-3" />{{ item.name }}
                  </a>
                </div>
              </div>

              <div v-if="mainStore.user" class="flex flex-shrink-0 bg-gray-700 p-4">
                <a href="#" class="group block w-full flex-shrink-0">
                  <div class="flex items-center">
                    <div>
                      <UserCircleIcon class="inline-block h-9 w-9 rounded-full text-gray-300" />
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-white">{{ mainStore.user.email_value }}</p>
                      <p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </DialogPanel>

          </TransitionChild>
          <div class="w-14 flex-shrink-0">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col bg-gray-800">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <img class="h-8 w-auto" src="@/assets/9p-logo-empty.png" alt="9P logo" />
            <!-- <div class="text-gray-300 pl-2 pt-1 font-bold">9P</div> -->
          </div>
          <nav class="mt-5 flex-1 space-y-1 px-2">
            <a v-for="item in navigation" :key="item.name" :href="item.href"
              :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
              <component :is="item.icon"
                :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']"
                aria-hidden="true" />
              {{ item.name }}
            </a>
          </nav>
        </div>



        <div class="mt-8">
          <div class="m-2 space-y-1" aria-labelledby="projects-headline">
            <button v-for="item in secondaryNavigation" :key="item.name" :href="item.href" @click="item.action"
              class="group w-full flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              <component :is="item.icon" class="truncate h-6 w-6 mr-3" />{{ item.name }}
            </button>
          </div>
        </div>

        <div v-if="mainStore.user" class="flex flex-shrink-0 bg-gray-700 p-4">
          <a href="#" class="group block w-full flex-shrink-0">
            <div class="flex items-center">
              <div>
                <UserCircleIcon class="inline-block h-9 w-9 rounded-full text-gray-300" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-semibold text-gray-200">{{ mainStore.user.email_value }}</p>
                <p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:pl-64">


      <div class="sticky top-0 bg-gray-800 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <div class="flex ">
          <button type="button"
            class="-ml-0.5 -mt-0.5 flex h-12 items-center   justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none "
            @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <!-- <Bars3Icon class="h-6 w-6 ml-3 text-gray-100 " aria-hidden="true" /> -->
            <img class="h-7 ml-3 mb-1" src="@/assets/9p-logo-empty.png" alt="9P logo" />
          </button>
          <div class="text-blue-300  grow mt-2 items-center justify-center">
            <div class="flex items-center justify-center">

              <!-- <div class="text-gray-300 pl-2 pt-1 font-bold">9P</div> -->
            </div>
          </div>
        </div>
      </div>
      <main class="">
        <div class="py-2">
          <div class="mx-auto max-w-7xl px-2 sm:px-2 lg:px-8">
            <!-- <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1> -->
          </div>
          <div class=" max-w-7xl px-1 sm:px-2 md:px-8">
            <!-- Replace with your content -->


            <DailyPanelFrame />


            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/mainStore.js'
// import VerifyInput from '@/components/VerifyInput.vue'
import FlashMessage from '@/components/FlashMessage.vue'
import DailyPanelFrame from '@/components/DailyPanelFrame.vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  Bars3Icon,
  CalendarIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  BookOpenIcon,
  UsersIcon,
  XMarkIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  CalculatorIcon
} from '@heroicons/vue/24/outline'



import { mapStores } from 'pinia'
import VueCookies from 'vue-cookies'


export default {
  data() {
    return {
      navigation: [
        { name: 'Daily', href: '#', icon: CalendarIcon, current: true },
        { name: 'Weekly', href: '#', icon: CalendarDaysIcon, current: false },
        { name: 'Stats', href: '#', icon: CalculatorIcon, current: false },
        { name: 'Graph', href: '#', icon: ChartBarIcon, current: false },
      ],
      secondaryNavigation: [
        { name: 'API Docs', icon: BookOpenIcon, href: '#', action: this.useDocsTest },
        { name: 'Sign Out', icon: ArrowLeftOnRectangleIcon, href: '#', action: this.signUserOut },
      ],
      sidebarOpen: false
    }
  },
  computed: {
    ...mapStores(useMainStore)
  },
  methods: {
    signUserOut() {
      console.log("sign out clicked")
      this.sidebarOpen = false
      this.$router.push({ name: "Landing" })
      VueCookies.remove("9p_access_token")
      this.mainStore.messages.push({message: "Signed out"})
      setTimeout(() => this.mainStore.messages.shift(), 5000)
    },
    useDocsTest() {
      console.log("user docs clicked")
    },
    addFlash() {
      console.log("msg msg msg")
      this.mainStore.messages.push({ message: "yo yo this is muthafuckin TEST", error: true })
      setTimeout(() => this.mainStore.messages.shift(), 5000)
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
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,

    FlashMessage,

    DailyPanelFrame
  }
}

</script>