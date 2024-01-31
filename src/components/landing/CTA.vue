
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

            <img v-if="Store.theme === 'dusk'" loading="eager" alt="screenshot of the Nine Panels main screen showing completed panels and the consistency grid" src="@/assets/v5/cta_panels_dusk.jpg" class="w-52 sm:w-60 rounded-xl border-np-matchbgfill border-2 p-0.5"  />
            <img v-if="Store.theme === 'ocean'" loading="eager" alt="screenshot of the Nine Panels main screen showing completed panels and the consistency grid" src="@/assets/v5/cta_panels_ocean.jpg" class="w-52 sm:w-60 rounded-xl border-np-matchbgfill border-2 p-0.5" />
            <img v-if="Store.theme === 'sky'" loading="eager" alt="screenshot of the Nine Panels main screen showing completed panels and the consistency grid" src="@/assets/v5/cta_panels_sky.jpg" class="w-52 sm:w-60 rounded-xl border-np-matchbgfill border-2 p-0.5" />
            <img v-if="Store.theme === 'autumn'" loading="eager" alt="screenshot of the Nine Panels main screen showing completed panels and the consistency grid" src="@/assets/v5/cta_panels_autumn.jpg" class="w-52 sm:w-60 rounded-xl border-np-matchbgfill border-2 p-0.5" />
            <img v-if="Store.theme === 'night'" loading="eager" alt="screenshot of the Nine Panels main screen showing completed panels and the consistency grid" src="@/assets/v5/cta_panels_night.jpg" class="w-52 sm:w-60 rounded-xl border-np-matchbgfill border-2 p-0.5" />
        </div>
        <div class="flex justify-between w-4/5 mt-8 mb-4 ">
            <div class=" text-np-base font-semibold">
                <button @click="Store.openRightTray('SignInForm')">Sign in</button>
            </div>
            <div class="font-semibold text-np-base">
                <button @click="Store.openRightTray('SignUpForm')">Sign up</button>
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