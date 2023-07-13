
<template>
    <div class="relative overflow-hidden">


        <div>
            <h1 class="text-center mt-12 text-4xl mb-12 font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block text-gray-600">Consistency</span>
                <span class="block text-gray-600">vigilance needs visibility</span>
            </h1>

                    <div class="mx-auto  max-w-7xl px-4 sm:mt-24 sm:px-6 ">
                        <div class="text-center ">
                            <div class="flex flex-col justify-center items-center w-full ">
                                <router-link :to="{ name: 'SignIn' }"
                                    class="inline-block border border-gray-200 bg-white rounded-md w-full px-3 py-2 max-w-sm text-sm  text-gray-600 hover:bg-gray-800 hover:text-gray-50">
                                    Sign
                                    in</router-link>
                                <router-link :to="{ name: 'SignUp' }"
                                    class="inline-block border border-gray-200 bg-white rounded-md w-full mt-3 max-w-sm  py-2 px-4 text-sm  hover:bg-gray-800 text-gray-600 hover:text-gray-50 ">Sign
                                    up
                                </router-link>
                            </div>
                        </div>
                    </div>

        </div>

        <!-- <div class="relative">
            <div class="absolute inset-0 flex flex-col" aria-hidden="true">
                <div class="flex-1" />
                <div class="w-full flex-1 bg-blue-300" />
            </div>
            <div class="mx-auto flex max-w-7xl px-8 sm:px-6">
                <img class="relative rounded-lg  shadow-lg " src="src/assets/desktop-main.png" alt="App screenshot" />


            </div>
        </div> -->
    </div>
</template>