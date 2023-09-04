<template>
  <div>
    <TransitionRoot as="template" :show="this.Store.leftNavIsOpen">
      <Dialog as="div" class="relative z-40 "
        @close="this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false">
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
                  <button aria-label="Close sidebar" type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full "
                    @click="this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <div class="h-0 flex-1 overflow-y-auto pt-5 ">
                <router-link @click="this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false"
                  :to="{ name: 'Landing' }"><img class="h-7 ml-5 w-auto" src="@/assets/9p-logo-empty.png"
                    alt="9P logo" /></router-link>
                <div class="m-2 mt-3 space-y-1" aria-labelledby="projects-headline">
                  <router-link v-if="this.accessTokenIsPresent()"
                    @click="this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false" :to="{ name: 'Panels' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <CalendarDaysIcon class="h-6 w-6" /><span class="ml-3">Nine Panels</span>
                  </router-link>
                </div>
              </div>

              <div class="mt-8">
                <div class="m-2 space-y-1" aria-labelledby="projects-headline">
                  <button @click="shareApp()"
                    class="group flex w-full items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <ShareIcon class="h-6 w-6" /><span class="ml-3">Share</span>
                  </button>
                  <ShareBox v-if="this.Store.shareBoxIsOpen">
                  </ShareBox>
                  <router-link @click="this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false"
                    :to="{ name: 'About' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <QuestionMarkCircleIcon class="h-6 w-6" /><span class="ml-3">About</span>
                  </router-link>
                  <router-link v-if="this.accessTokenIsPresent()"
                    @click="this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false" :to="{ name: 'Account' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <UserCircleIcon class="h-6 w-6" /><span class="ml-3">Account</span>
                  </router-link>
                  <router-link v-if="this.accessTokenIsPresent()" @click="this.signUserOut()" :to="{ name: 'Landing' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <ArrowLeftOnRectangleIcon class="h-6 w-6" /><span class="ml-3">Sign Out</span>
                  </router-link>
                  <router-link v-if="!this.accessTokenIsPresent()"
                    @click="this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false" :to="{ name: 'SignIn' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <UserCircleIcon class="h-6 w-6" /><span class="ml-3">Sign In</span>
                  </router-link>
                  <router-link v-if="!this.accessTokenIsPresent()"
                    @click="this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false" :to="{ name: 'SignUp' }"
                    class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <UserPlusIcon class="h-6 w-6" /><span class="ml-3">Sign Up</span>
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

    <div class="flex flex-col viewport-height items-center w-full">
      <div class="sticky top-0 bg-gray-800 pl-1 pt-1 z-30  w-full ">
        <div class="flex justify-between">
          <button type="button" aria-label="Open sidebar"
            class="-ml-0.5 -mt-0.5 flex h-12 items-center   justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none "
            @click="this.Store.leftNavIsOpen = true">
            <span class="sr-only">Open sidebar</span>
            <img class="h-7 ml-3 mb-1" src="@/assets/9p-logo-empty.png" alt="9P logo" />
          </button>
          <div class="pt-2">
            <button v-if="this.Store.user" @click="this.openHelpTray()" type="button" aria-label="Open help"
              class="pb-1 pr-4">
              <QuestionMarkCircleIcon class="text-gray-300 h-5" />
            </button>
            <button v-if="this.Store.user" @click="this.installPWA()" type="button"
              aria-label="Install app to device as progressive web app" class="pr-4">
              <ArrowDownOnSquareIcon class="text-gray-300 h-6" />
            </button>
          </div>
        </div>
      </div>
      <main class="max-w-md h-full w-full">
        <RouterView />
        <PrimaryTray />
      </main>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import VueCookies from 'vue-cookies'
import FlashMessage from '@/components/FlashMessage.vue'
import Welcome from '@/components/Welcome.vue'
import PanelGridFrame from '@/components/PanelGridFrame.vue'
import PrimaryTray from '@/components/PrimaryTray.vue'
import HelpDetail from '@/components/HelpDetail.vue'
import ShareBox from '@/components/ShareBox.vue'
import NProgress from 'nprogress'
import rollbar from '@/rollbarClient.js'
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
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon,
  GlobeEuropeAfricaIcon,
  CalculatorIcon,
  BeakerIcon,
  GlobeAltIcon,
  ShareIcon,
  ArrowDownOnSquareIcon
} from '@heroicons/vue/24/outline'





export default {

  computed: {
    ...mapStores(useStore),
  },
  watch: {
    'Store.loadingBar'(newVal) {
      if (newVal) {
        NProgress.start();
      } else {
        NProgress.done();
      }
    },
  },
  mounted() {
    this.Store.getUserAction()
    let deferredPrompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      deferredPrompt = e
      this.Store.deferredPrompt = deferredPrompt
    })
  },
  methods: {
    signUserOut() {
      this.Store.signUserOutAction()
      this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false
      this.Store.$reset()
      this.$router.push({ name: "Landing" })
    },
    openTray() {
      this.Store.primaryTrayIsOpen = true
    },
    accessTokenIsPresent() {
      const access_token = VueCookies.get("9p_access_token")
      if (access_token) {
        return true
      } else {
        return false
      }
    },
    async shareApp() {
      if (navigator.share) {
        console.log("sharing")
        try {

          await navigator.share({
            title: 'Daily balance, long-term consistency.\nNine Panels brings visibility to your daily consistency, nurturing awareness and connection to the most important areas of your life.',
            text: 'Daily balance, long-term consistency.\nNine Panels brings visibility to your daily consistency, nurturing awareness and connection to the most important areas of your life.',
            url: "https://ninepanels.com",
          })
          if (this.Store.user) {
            rollbar.info("shared using WebShare by " + this.Store.user.name)
          } else {
            rollbar.info("shared using WebShare API by a logged out visitor or this.Store.user unavailbale")
          }

        } catch (error) {
          console.log(error)
        }
        // .then(() => console.log('Successful share'))
        // .catch((error) => console.log('Error sharing', error));
      } else {
        this.toggleShareBox()
      }
    },
    toggleShareBox() {
      this.Store.shareBoxIsOpen = !this.Store.shareBoxIsOpen
    },
    openHelpTray() {
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'HelpDetail'
      this.Store.primaryComponentProps = null
    },
    async installPWA() {
      const deferredPrompt = this.Store.deferredPrompt;
      if (!deferredPrompt) return;

      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      this.$deferredPrompt = null;
    },

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
    PanelGridFrame,
    PrimaryTray,
    UserPlusIcon,
    GlobeEuropeAfricaIcon,
    GlobeAltIcon,
    CalendarDaysIcon,
    Welcome,
    ShareIcon,
    ShareBox,
    HelpDetail,
    ArrowDownOnSquareIcon
  }
}

</script>