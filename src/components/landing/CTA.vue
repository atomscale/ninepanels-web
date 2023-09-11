
<template>
    <div class="flex flex-col h-full justify-between items-center">


        <div>
            <h1 class="text-center text-2xl mb-6 sm:text-5xl md:text-6xl">

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
        <img loading="eager" src="@/assets/cta_static.jpg" class="px-20 mt-2"/>
        <div class="flex justify-between w-4/5 mt-8 mb-4 ">
            <div class=" text-gray-500 font-semibold">
                <router-link :to="{ name: 'SignIn' }">Sign in</router-link>
            </div>
            <div class="font-semibold text-gray-500">
                <router-link :to="{ name: 'SignUp' }">Sign up</router-link>
            </div>
        </div>


    </div>
</template>