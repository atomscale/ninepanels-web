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
                            <input v-model="username" id="email" name="email" type="email" autocomplete="email"
                                required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block font-light text-xs text-gray-800">Password</label>
                        <div class="mt-1 flex relative">
                            <input v-model="password" id="password" name="password"
                                :type="passwordVisible ? 'text' : 'password'" autocomplete="current-password"
                                required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                            <button class="text-xs absolute right-2 top-1 bg-white  h-5/6 flex items-center justify-center" @click="togglePasswordVisibility()">
                                <component class="h-5 w-5 text-gray-400" :is="passwordVisible ? 'EyeSlashIcon': 'EyeIcon'">
                                </component>
                            </button>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex justify-center border border-gray-200 rounded-md w-full mt-3 max-w-sm  py-2 px-4 text-sm bg-gray-800 text-gray-50 hover:bg-white hover:text-gray-600  shadow-sm"
                            @click="sendLogIn()">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'
import {
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/vue/24/outline'


export default {

    computed: {
        ...mapStores(useStore)
    },
    data() {
        return {
            username: '',
            password: '',
            passwordVisible: false
        }
    },
    methods: {
        async sendLogIn() {
            NProgress.start()
            const token = await this.Store.getLoginTokenAction(this.username, this.password)
            if (token) {
                NProgress.done()
                this.$router.push({ name: 'Panels' })
            } else {
                this.$router.push({ name: 'SignIn' })
                NProgress.done()
            }
            NProgress.done()
        },
        togglePasswordVisibility() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId)
                this.timeoutId = null
            }

            this.passwordVisible = !this.passwordVisible

            if (this.passwordVisible) {
                this.timeoutId = setTimeout(() => {
                    this.passwordVisible = false;
                    this.timeoutId = null;
                }, 5000);
            }

        }
    },
    components: {
        EyeIcon,
        EyeSlashIcon
    }
}


</script>