<template>
    <div class="flex h-full flex-col mt-4 justify-between pt-6 px-4">


        <div class="bg-white pt-4  sm:rounded-lg sm:px-10 ">
            <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                <div class="font-bold text-xl text-gray-500 ">Welcome back! Sign in...</div>
                <div>
                    <label for="email" class="block font-light text-xs text-gray-800">Email address</label>
                    <div class="mt-1">
                        <input v-model="username" id="email" name="email" type="email" autocomplete="email" required="true"
                            class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                    </div>
                </div>

                <div>
                    <label for="password" class="block font-light text-xs text-gray-800">Password</label>
                    <div class="mt-1 flex relative">
                        <input @keydown="preventEnter" v-model="password" id="password" name="password"
                            :type="passwordVisible ? 'text' : 'password'" autocomplete="current-password" required="true"
                            class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                        <button tabindex="-1"
                            class="text-xs absolute right-2 top-1 bg-white  h-5/6 flex items-center justify-center"
                            @click="togglePasswordVisibility()">
                            <component class="h-5 w-5 text-gray-400" :is="passwordVisible ? 'EyeSlashIcon': 'EyeIcon'">
                            </component>
                        </button>
                    </div>
                </div>

                <div class="flex justify-center">
                    <DynamicButton class="w-full" :parentMethod="sendLogIn" :buttonText="'Sign in'"
                        :confirmRequired="false" />
                </div>
            </form>
            <div class="flex justify-between">
                <div class="font-semibold text-xs text-gray-500">
                    <router-link :to="{ name: 'SignUp' }">Need an account?</router-link>
                </div>
                <div class="font-semibold text-xs text-gray-500">
                    <router-link :to="{ name: 'PasswordReset' }">Forgot your password?</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import DynamicButton from '@/components/utilities/DynamicButton.vue'
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
            this.Store.loadingBar = true
            const token = await this.Store.getLoginTokenAction(this.username, this.password)
            if (token) {
                this.Store.loadingBar = false
                this.$router.push({ name: 'Panels' })
            } else {
                this.$router.push({ name: 'SignIn' })
                this.Store.loadingBar = false
            }
            this.Store.loadingBar = false
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible
            setTimeout(() => this.passwordVisible = false, 5000)
        },
        preventEnter(event) {
            if (event.code === 'Enter' || event.key === 'Enter') {
                event.preventDefault()
            }
        }

    },
    components: {
        EyeIcon,
        EyeSlashIcon,
        DynamicButton
    }
}

</script>