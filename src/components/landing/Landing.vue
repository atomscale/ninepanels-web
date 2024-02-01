
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
                        <button
                            class="border-np-base font-extrabold text-np-base border px-2 pt-0.5 pb-1 bg-np-base rounded-md"
                            @click="Store.openRightTray('SignUpForm')">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-12  ">

            <div id="help"
                class="flex flex-col h-full w-full justify-between items-center overflow-y-scroll bg-np-fill text-np-inverted">

                <div>
                    <div class="text-center w-full text-4xl md:text-6xl ">

                        <div class="flex justify-center  space-x-2 mt-36">

                            <span class="block  font-light">Daily</span>
                            <span class="block  font-bold">balance,</span>
                        </div>


                        <div class="flex justify-center  space-x-2">

                            <span class="block  font-light">long-term <span class="font-bold">consistency</span></span>

                        </div>
                    </div>
                </div>
                <div class="w-3/5 md:w-1/3 mt-56 text-center mb-4">A simple consistency and balance visbility tool
                    for the intrinsically motivated.
                </div>

                <div class="bg-white w-full h-full flex flex-col justify-start items-center align-middle">

                    <div class="flex flex-col justify-start items-center h-full w-full md:w-1/3 mt-4  ">
                        <div class="flex items-center w-full justify-center flex-col relative">
                            <div class="fade-t-to-b-soft">
                                <img class='' src="@/assets/v5/grid.jpg" />
                            </div>
                            <div class="   w-full h-full absolute bg-white opacity-20">
                            </div>
                            <div class="absolute bottom-24 w-2/3 text-4xl text-np-base font-bold text-center align-middle">

                                1. Define your balance
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col justify-start items-center h-full   w-full md:w-1/3">
                        <div class="flex items-center w-full justify-center flex-col relative">
                            <div class="fade-t-to-b-hard w-full">
                                <img class='' src="@/assets/v5/completed.jpg" />
                            </div>
                            <div class="   w-full h-full absolute bg-white opacity-20">
                            </div>
                            <div class="absolute bottom-24 w-2/3 text-4xl text-np-base font-bold text-center align-middle">

                                2. Tap when you engage.
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col justify-start items-center h-full  w-full md:w-1/3 ">
                        <div class="flex items-center w-full justify-center flex-col relative">
                            <div class="fade-t-to-b-hard w-full">
                                <img class='' src="@/assets/v5/graph.jpg" />
                            </div>
                            <div class="   w-full h-full absolute bg-white opacity-20">
                            </div>
                            <div
                                class="absolute top-3/4 w-2/3 text-4xl mb-12 text-np-base font-bold text-center align-middle">

                                3. Understand your patterns.
                            </div>
                        </div>
                        <div class="h-12 bg-white w-full"></div>
                    </div>
                    <div
                        class="flex flex-col justify-start text-np-inverted items-center h-full w-full pt-12 bg-np-fill pb-12 px-4">


                        <div class="text-4xl font-bold text-center  ">

                            Who it's for
                        </div>
                        <div class="text-center space-y-4 mt-8">

                            <div>For those who get so in to one thing, sight is lost of all the other things.</div>
                            <div>For those who see every day as a fresh start, and appreciate the upsides of failing small
                                and
                                fast.</div>
                            <div>For those who sense that daily(ish) balance and long term consistency are the keys to
                                success.
                            </div>
                            <div>For those who choose to define their own success.</div>
                            <div>For the intrinsically motivated, curious and grown-up folk, who dont need a barrage of
                                'nudge
                                notifications' or 'gamification'.</div>
                            <div>For those who want the essential parts of an app they use to be free forever, with no ads,
                                and
                                no
                                creepy big-tech bs.</div>
                        </div>
                        <div class="flex text-sm justify-end mt-12 font-extrabold text-np-inverted mr-4">

                            <div class=" ">
                                <button
                                    class="border-np-base h-10 w-24 text-np-base border px-2 pt-0.5 pb-1 bg-np-base rounded-lg"
                                    @click="Store.openRightTray('SignUpForm')">Sign up</button>
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

import {
    ArrowDownCircleIcon
} from '@heroicons/vue/24/outline'

export default {
    computed: {
        ...mapStores(useStore)
    },
    components: {
        ArrowDownCircleIcon
    }

}
</script>