<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-50 " >
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto ">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class=" relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Atomscale will use a single, essential cookie if you continue...</DialogTitle>
                    <div class="mt-2 text-sm text-gray-500">
                      <p class="">By signing up to this service you agree to allow atomscale.co to store a long-lived access token in your device's cookie storage. This is to <b>enable you to remain logged in </b>between your browser sessions.</p>
                      <br/>
                      <p> You are <b>not tracked</b> by any third parties. Your personal data will <b>never, ever be sold.</b> </p>
                      <p>
                        <br/>
                     <b>All of your personal data is encrypted</b> both when it is at rest in data storage, and when it is in transit to and from your device.
                      </p>
                      <br/>
                      <p> See our
                        <a href="#" class="underline">Privacy Policy</a> and
                        <a href="#" class="underline">Security Policy</a> for more details.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm" @click="open = false">Agree and continue</button>
                  <a href="https://www.google.com">
                    <button type="button" class="inline-flex mt-2 w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm" @click="open = false">Nope. Get me out of here</button>
                    </a>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { CheckIcon } from '@heroicons/vue/24/outline'

  const open = ref(true)
  </script>