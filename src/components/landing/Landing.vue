
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
                                <img class='' src="@/assets/v5/grid.jpg" loading="eager" />
                            </div>
                            <div class="   w-full h-full absolute bg-white opacity-20">
                            </div>
                            <div class="absolute bottom-24 w-2/3 text-4xl text-np-base font-bold text-center align-middle">

                                1. Define your daily balance
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col justify-start items-center h-full   w-full md:w-1/3">
                        <div class="flex items-center w-full justify-center flex-col relative">
                            <div class="fade-t-to-b-hard w-full">
                                <img class='' src="@/assets/v5/completed.jpg" loading="eager" />
                            </div>
                            <div class="   w-full h-full absolute bg-white opacity-20">
                            </div>
                            <div class="absolute bottom-24 w-2/3 text-4xl text-np-base font-bold text-center align-middle">

                                2. Tap when you complete.
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col justify-start items-center h-full  w-full md:w-1/3 ">
                        <div class="flex items-center w-full justify-center flex-col relative">
                            <div class="fade-t-to-b-hard w-full">
                                <img class='' src="@/assets/v5/graph.jpg" loading="eager" />
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
                        class="flex flex-col justify-start items-center text-np-inverted  h-full w-full pt-12 bg-np-fill pb-12 px-4">


                        <div class=" h-full text-4xl font-bold text-center w-full md:w-4/5 lg:w-3/5 xl:w-1/2 ">

                            Who it's for
                        </div>
                        <div class="text-center space-y-4 mt-8 w-full md:w-4/5 lg:w-3/5 xl:w-1/2">

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
                    <div
                        class="flex flex-col justify-center items-center h-full w-full md:w-4/5 lg:w-3/5 xl:w-1/2 pt-12  text-np-base  bg-np-base pb-12 px-4">


                        <div class="text-4xl font-bold text-center h-full ">

                            Why is Ninepanels not in the App or Play Store?
                        </div>
                        <div class="flex flex-col justify-center items-center text-center space-y-4 mt-8 h-full">
                            <div>Instead of being in the app stores we are proudly web based and offer a Progressive Web App
                                (PWA).</div>
                            <div class="h-full flex items-center justify-center">
                                <img class="w-full sm:w-3/5  rounded-3xl " src="@/assets/ios_installed.jpg" />
                            </div>
                            <div>As a PWA, Ninepanels is installable onto your mobile device and looks and feels just like
                                an app from your
                                store. The <button class="font-bold underline" @click="Store.openRightTray('InstallGuide')">way to install it </button> might not be what you are used to, but it's equally easy.</div>

                            <div class="text-lg font font-extrabold">Your experience and security matters</div>
                            <div>Not being in the app stores mean that app updates can be pushed to you in around <i>2
                                    minutes</i>. That means faster feature development and a more secure app.</div>
                            <div>Thoughtful design in areas like the authentication system and UI elements help deliver the
                                fluid user experience you'd expect from app store apps.</div>
                            <div class="text-lg font font-extrabold">Cost matters</div>
                            <div>Ninepanels wants to be free forever for all the essential features you need.</div>
                            <div>Building iOS and Android versions adds time in development and deployment and that, as we know, equals money. This
                                increased cost base accounts for why many app store apps are not free forever.</div>
                            <div>The app stores also charge 15% on all revenue to small apps like Ninepanels. Thats a huge
                                inflationary pressure on the cost of digital services and impedes users and builders.</div>
                            <div class="text-lg font font-extrabold">The open web matters</div>
                            <div>The web is designed to be decentralised. Social media and the app stores have cannibalised
                                that openness and built global-scale paywalls around content. The price you pay is your
                                attention and personal data.</div>
                            <div>Ninepanels doesn't track you after you leave, doesn't sell your data, and is by design
                                anti-attention seeking. A simple tool for grown ups.</div>
                            <div>The only reason an email is needed at all is to verify you're not a bot, and to communicate
                                with you if we need to.</div>
                        </div>


                    </div>

                </div>
                <div class="h-24 w-full"></div>




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