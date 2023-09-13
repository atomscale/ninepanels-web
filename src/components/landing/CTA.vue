
<template>
    <div class="flex flex-col h-full justify-between items-center">


        <div>
            <h1 class="text-center text-2xl mb-6 sm:text-5xl md:text-6xl">

                <div class="flex justify-center space-x-2">

                    <span class="block text-np-base text-3xl font-light">Daily</span>
                    <span class="block text-np-base text-3xl font-bold">balance.</span>
                </div>

                <div class="flex justify-center space-x-2">

                    <span class="block text-np-base text-3xl font-light">Long-term</span>
                    <span class="block text-np-base text-3xl font-bold">consistency.</span>
                </div>
            </h1>
        </div>
        <div class="flex justify-around">

            <img v-if="Store.theme === 'noir'" loading="eager" alt="screenshot of the Nine Panels main screen showing completed panels and the consistency grid" src="@/assets/cta_screenshot_noir.jpeg" class="w-60"/>
            <img v-if="Store.theme === 'ocean'" loading="eager" alt="screenshot of the Nine Panels main screen showing completed panels and the consistency grid" src="@/assets/cta_screenshot_ocean.jpeg" class="w-60"/>
        </div>
        <div class="flex justify-between w-4/5 mt-8 mb-4 ">
            <div class=" text-np-base font-semibold">
                <router-link :to="{ name: 'SignIn' }">Sign in</router-link>
            </div>
            <div class="font-semibold text-np-base">
                <router-link :to="{ name: 'SignUp' }">Sign up</router-link>
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