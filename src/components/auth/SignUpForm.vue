<template>
    <div class="flex min-h-full flex-col justify-between  ">

            <div class="bg-np-base  sm:rounded-lg  ">
                <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                    <div class="font-bold text-xl text-np-base ">Sign up to unlock long-term consistency</div>
                    <div>
                        <label for="email" class="block font-light text-xs text-np-base">Email address</label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" required="true" v-model="email"
                                class="block w-full text-np-base bg-np-base appearance-none rounded-md border border-np-base px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="name" class="block font-light text-xs text-np-base">Name</label>
                        <div class="mt-1">
                            <input id="name" name="name" type="text" autocomplete="given-name" required="true"
                                v-model="name"
                                class="block w-full text-np-base bg-np-base appearance-none rounded-md border border-np-base px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password_first" class="block font-light text-xs text-np-base">Password</label>
                        <div class="mt-1 flex relative">
                            <input v-model="password_first" id="password_first" name="password_first"
                                :type="passwordVisible ? 'text' : 'password'"
                                required="true"
                                class="block w-full text-np-base bg-np-base appearance-none rounded-md border border-np-base px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                            <button tabindex="-1" class="text-xs absolute right-2 top-1 bg-np-base  h-5/6 flex items-center justify-center"
                                @click="togglePasswordVisibility()">
                                <component class="h-5 w-5 text-np-base" :is="passwordVisible ? 'EyeSlashIcon': 'EyeIcon'">
                                </component>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label for="password_second" class="block font-light text-xs text-np-base">Repeat password</label>
                        <div class="mt-1 flex relative">
                            <input v-model="password_second" id="password_second" name="password_second"
                                :type="passwordVisible ? 'text' : 'password'"
                                required="true"
                                class="block w-full text-np-base bg-np-base appearance-none rounded-md border border-np-base px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                            <button tabindex="-1" class="text-xs absolute right-2 top-1 bg-np-base  h-5/6 flex items-center justify-center"
                                @click="togglePasswordVisibility()">
                                <component class="h-5 w-5 text-np-base" :is="passwordVisible ? 'EyeSlashIcon': 'EyeIcon'">
                                </component>
                            </button>
                        </div>
                    </div>



                    <div class="font-light text-xs text-np-base">Free for basic use forever. No funny business or tracking. No ads, ever.
                    </div>
                    <div class="font-light text-xs text-np-base">By signing up you agree for ninepanels.com to store
                        your data and you agree to our <button @click="Store.openRightTray('PrivacyPolicy', null, 'SignUpForm', null)"><b>Privacy Policy</b></button>. Your data will never, ever be sold.</div>

                        <div class="font-light text-xs text-np-base">By signing up you also agree to a single cookie being stored on your device (so you can be kept logged in between visits) along with some non-sensitive items in local device storage for things like theme settings.</div>
                        <div>
                            <DynamicButton :parentMethod="signUserUp" :buttonText="'Create your account'"
                                :confirmRequired="false" />
                        </div>
                    </form>
                <div class="flex justify-between mt-6">
                    <div class="font-semibold text-xs text-np-base">
                        <button @click="Store.openRightTray('SignInForm', null, 'SignUpForm')">Sign in instead</button>
                    </div>
                    <div class="font-semibold text-xs text-np-base">
                        <button @click="Store.openRightTray('PasswordResetRequestForm', null, 'SignUpForm')">Forgot your password?</button>
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
import DynamicButton from '@/components/general/DynamicButton.vue'

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
                this.Store.closeRightTray()
                this.$router.push({ name: 'Panels' })
            }
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible
        }
    },
    components: {
        EyeIcon,
        EyeSlashIcon,
        DynamicButton
    }

}

</script>