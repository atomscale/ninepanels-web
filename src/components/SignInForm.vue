<template>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-600">Sign In</h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="onSubmit" class="space-y-6" action="#" method="POST">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-600">Email address</label>
                        <div class="mt-1">
                            <input v-model="data.username" id="email" name="email" type="email" autocomplete="email"
                                required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
                        <div class="mt-1">
                            <input v-model="data.password" id="password" name="password" type="password"
                                autocomplete="current-password" required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex justify-center border border-gray-200 rounded-md w-full mt-3 max-w-sm  py-2 px-4 text-sm hover:bg-gray-800 text-gray-600 hover:text-gray-50"
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
import { useMainStore } from '@/stores/mainStore.js'
import { useRouter } from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({ minimum: 0.3 })
NProgress.configure({ trickleRate: 0.2, trickleSpeed: 400 });

const mainStore = useMainStore()
const router = useRouter()

const data = ref({
    username: 'ben@ben.com',
    password: 'password'
})


async function sendLogIn(data) {
    NProgress.start()
    var token = await mainStore.getLoginToken(data.username, data.password)
    console.log("access token rcvd", token)
    if (token) {
        router.push({ name: 'Console' })
    } else {
        router.push({ name: 'SignIn' })
    }
    NProgress.done()

}


</script>