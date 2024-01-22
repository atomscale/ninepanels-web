<template>
    <div class="flex h-full flex-col mt-4 justify-between pt-6 px-4">


        <div class="bg-np-base pt-4  sm:rounded-lg sm:px-10 ">
            <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                <div class="font-bold text-xl text-np-base ">Welcome back! Sign in...</div>
                <div>
                    <label for="email" class="block font-light text-xs text-np-base">Email address</label>
                    <div class="mt-1">
                        <input v-model="username" id="email" name="email" type="email" autocomplete="email" required="true"
                            class="block w-full appearance-none text-np-base bg-np-base rounded-md border border-np-base px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                    </div>
                </div>

                <div>
                    <label for="password" class="block font-light text-xs text-np-base">Password</label>
                    <div class="mt-1 flex relative">
                        <input @keydown="preventEnter" v-model="password" id="password" name="password"
                            :type="passwordVisible ? 'text' : 'password'" autocomplete="current-password" required="true"
                            class="block w-full appearance-none rounded-md bg-np-base  text-np-base border border-np-base px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                        <button tabindex="-1"
                            class="text-xs absolute right-2 top-1 bg-np-base  h-5/6 flex items-center justify-center"
                            @click="togglePasswordVisibility()">
                            <component class="h-5 w-5 text-np-base" :is="passwordVisible ? 'EyeSlashIcon': 'EyeIcon'">
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
                <div class="font-semibold text-xs text-np-base">
                    <router-link :to="{ name: 'SignUp' }">Need an account?</router-link>
                </div>
                <div class="font-semibold text-xs text-np-base">
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
            username: 'bwdyer@gmail.com',
            password: 'newpassword',
            passwordVisible: false
        }
    },
    methods: {
        async sendLogIn() {
            const token = await this.Store.getLoginTokenAction(this.username, this.password)
            if (token) {
                this.$router.push({ name: 'Panels' })
            }
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