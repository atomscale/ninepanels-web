
<template>
    <div class="h-full w-full">
        <div class="fixed z-40 top-0 left-0 w-full h-12 bg-np-fill ">

            <div class="justify-between flex">
                <div>
                    <img class="h-8 ml-2 mt-1.5 " src="/9p-logo-empty-filled-sq.png" alt="the nine panels logo"
                        loading="eager" />
                </div>
                <div class="flex text-sm justify-end mt-2.5 text-np-inverted mr-4">
                    <div class=" mt-0.5  mr-2">
                        <button class="px-2 pt-0.5 pb-1 " @click="Store.openRightTray('SignInForm')">Sign in</button>
                    </div>
                    <div class=" ">
                        <button class="border-np-base text-np-base border px-2 pt-0.5 pb-1 bg-np-base rounded-lg"
                            @click="Store.openRightTray('SignUpForm')">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-20">

            <div class="flex flex-col h-full justify-between items-center overflow-auto">

                <div>
                    <h1 class="text-center mb-6 sm:text-5xl md:text-6xl">
                        <div class="flex justify-center space-x-2">

                            <span class="block text-np-base text-xl font-light">Welcome to Ninepanels 👋</span>

                        </div>
                        <div class="flex justify-center space-x-2 mt-6">

                            <span class="block text-np-base text-3xl font-light">Daily</span>
                            <span class="block text-np-base text-3xl font-bold">balance,</span>
                        </div>
                        <div class="flex justify-center space-x-2 mt-2">

                            <span class="block text-np-base text-xl font-light italic">meet</span>

                        </div>

                        <div class="flex justify-center space-x-2 mt-1">

                            <span class="block text-np-base text-3xl font-light">long-term</span>
                            <span class="block text-np-base text-3xl font-bold">consistency.</span>
                        </div>
                    </h1>
                </div>
                <div class="flex flex-col justify-start items-center h-full w-full px-3">
                    <div class="flex  mt-20 relative">
                        <div class="fade-l-to-r w-5/6">
                           <img  class='' src="@/assets/v5/grid.jpg" />
                        </div>
                        <div>

                            <div class="my-auto h-full align-middle text-np-base font-bold text-right text-xl absolute right-0 top-1/3 w-2/5">
                                Create panels representing areas of your life that matter to you
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-start items-center h-full w-full px-3">
                    <div class="flex  mt-20 relative">
                        <div class="fade-r-to-l w-5/6 ml-auto">
                            <img  class='' src="@/assets/v5/completed.jpg" />
                        </div>
                        <div>

                            <div class="my-auto h-full align-middle text-np-base font-bold text-left text-xl absolute left-0 top-10 mr-5 w-2/5">
                                Simply tap your panel when you engage.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-start items-center h-full w-full px-3">
                    <div class="flex  mt-20 relative">
                        <div class="fade-l-to-r w-5/6">
                           <img  class='' src="@/assets/v5/graph.jpg" />
                        </div>
                        <div>

                            <div class="my-auto h-full align-middle text-np-base font-bold text-right text-xl absolute right-0 top-20 w-3/5">
                                Visualise your consistency and understand positive patterns
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
    computed: {
        ...mapStores(useStore)
    },

}
</script>