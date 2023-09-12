<template>
    <div class="flex min-h-full flex-col justify-between px-4   ">

            <div class="bg-white py-4 sm:rounded-lg sm:px-10 ">
                <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                    <div class="font-bold text-xl text-gray-500 ">Consistent balance awaits...</div>
                    <div>
                        <label for="email" class="block font-light text-xs text-gray-800">Email address</label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" required="true" v-model="email"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="name" class="block font-light text-xs text-gray-800">Name</label>
                        <div class="mt-1">
                            <input id="name" name="name" type="text" autocomplete="given-name" required="true"
                                v-model="name"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password_first" class="block font-light text-xs text-gray-800">Password</label>
                        <div class="mt-1 flex relative">
                            <input v-model="password_first" id="password" name="password"
                                :type="passwordVisible ? 'text' : 'password'" autocomplete="current-password"
                                required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                            <button tabindex="-1" class="text-xs absolute right-2 top-1 bg-white  h-5/6 flex items-center justify-center"
                                @click="togglePasswordVisibility()">
                                <component class="h-5 w-5 text-gray-400" :is="passwordVisible ? 'EyeSlashIcon': 'EyeIcon'">
                                </component>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label for="password_second" class="block font-light text-xs text-gray-800">Repeat password</label>
                        <div class="mt-1 flex relative">
                            <input v-model="password_second" id="password" name="password"
                                :type="passwordVisible ? 'text' : 'password'" autocomplete="current-password"
                                required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                            <button tabindex="-1" class="text-xs absolute right-2 top-1 bg-white  h-5/6 flex items-center justify-center"
                                @click="togglePasswordVisibility()">
                                <component class="h-5 w-5 text-gray-400" :is="passwordVisible ? 'EyeSlashIcon': 'EyeIcon'">
                                </component>
                            </button>
                        </div>
                    </div>



                    <div>
                        <DynamicButton :parentMethod="signUserUp" :buttonText="'Create your account'"
                            :confirmRequired="false" />
                    </div>
                    <div class="font-light text-xs text-gray-500">Free forever. No funny business. No ads, ever.
                    </div>
                    <div class="font-light text-xs text-gray-500">By signing up you agree for ninepanels.com to store
                        your data. It will never, ever be sold.</div>

                    <div class="font-light text-xs text-gray-500">By signing up you also agree to a single, lonely
                        little cookie being stored on your device (so you can be kept logged in between visits).</div>
                </form>
                <div class="flex justify-between mt-6">
                    <div class="font-semibold text-xs text-gray-500">
                        <router-link :to=" { name: 'SignIn' }">Sign in instead</router-link>
                    </div>
                    <div class="font-semibold text-xs text-gray-500">
                        <router-link :to=" { name: 'PasswordReset' }">Forgot your password?</router-link>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
import { mapStores } from 'pinia'
import { useStore } from '@/stores/store.js'

import {
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/vue/24/outline'
import DynamicButton from '@/components/utilities/DynamicButton.vue'

export default {
    data() {
        return {
            email: '',
            name: '',
            password_first: '',
            password_second: '',
            passwordMismatch: false,
            passwordVisible: false
        }
    },
    computed: {
        ...mapStores(useStore)
    },
    methods: {
        async signUserUp() {

            if (this.password_first !== this.password_second) {
                this.passwordMismatch = true
                this.Store.messages.push({ message: "Passwords do not match" })
                setTimeout(() => this.Store.messages.shift(), 5000)
                return // stop function
            }


            const resp = await this.Store.createUserAction(this.email, this.name, this.password_second)
          
            if (resp) {
                this.$router.push({ name: 'Panels' })
            }
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible
            setTimeout(() => this.passwordVisible = false, 5000)
        }
    },
    components: {
        EyeIcon,
        EyeSlashIcon,
        DynamicButton
    }

}

</script>