
<template>
    <div class="flex flex-col h-full justify-between items-center">


        <div>
            <h1 class="text-center mt-10 text-2xl mb-6 sm:text-5xl md:text-6xl">

                <div class="flex justify-center space-x-2">

                    <span class="block text-gray-600 text-3xl font-light">Daily</span>
                    <span class="block text-gray-600 text-3xl font-bold">balance.</span>
                </div>

                <div class="flex justify-center space-x-2">

                    <span class="block text-gray-600 text-3xl font-light">Long-term</span>
                    <span class="block text-gray-600 text-3xl font-bold">consistency.</span>
                </div>
            </h1>
        </div>
        <video src="@/assets/full_demo_cta.mp4" class="px-10 mt-2" autoplay loop muted playsinline></video>
        <div class="flex justify-between mt-8 ">
            <div class=" text-gray-500 font-bold">
                <router-link :to="{ name: 'SignIn' }">Sign in</router-link>
            </div>
            <div class="font-bold text-gray-500">
                <router-link :to="{ name: 'SignUp' }">Sign up</router-link>
            </div>
        </div>


    </div>
</template>