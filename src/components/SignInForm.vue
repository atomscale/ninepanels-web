<template>
    <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
            <div class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-600"></div>
        </div>

        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-4 px-4  sm:rounded-lg sm:px-10 ">
                <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                    <div>
                        <label for="email" class="block font-light text-xs text-gray-800">Email address</label>
                        <div class="mt-1">
                            <input v-model="data.username" id="email" name="email" type="email" autocomplete="email"
                                required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block font-light text-xs text-gray-800">Password</label>
                        <div class="mt-1">
                            <input v-model="data.password" id="password" name="password" type="password"
                                autocomplete="current-password" required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex justify-center border border-gray-200 rounded-md w-full mt-3 max-w-sm  py-2 px-4 text-sm bg-gray-800 text-gray-50 hover:bg-white hover:text-gray-600  shadow-sm"
                            @click="sendLogIn(data)">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/store.js'
import { useRouter } from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({ minimum: 0.3 })
NProgress.configure({ trickleRate: 0.2, trickleSpeed: 400 });

const Store = useStore()
const router = useRouter()

const data = ref({
    username: '',
    password: ''
})


async function sendLogIn(data) {
    NProgress.start()
    const token = await Store.getLoginTokenAction(data.username, data.password)
    console.log("access token rcvd", token)
    if (token) {
        NProgress.done()
        // Store.messages.push({ message: "Welcome" })
        // setTimeout(() => Store.messages.shift(), 5000)
        router.push({ name: 'Panels' })
    } else {
        router.push({ name: 'SignIn' })
        NProgress.done()
    }
    NProgress.done()

}


</script>