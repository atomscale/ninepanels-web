<template>
    <div class="flex min-h-full flex-col justify-between px-4 py-6 mt-4">




        <div class="bg-np-base py-4 sm:rounded-lg px-10 ">
            <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                <div class="font-bold text-lg text-np-base">Choose a new password:</div>
                    <div>
                        <label for="password_first" class="block font-light text-xs text-np-base">Password</label>
                        <div class="mt-1 flex relative">
                            <input v-model="password_first" id="password" name="password"
                                :type="passwordVisible ? 'text' : 'password'" autocomplete="current-password"
                                required="true"
                                class="block w-full appearance-none bg-np-base text-np-base rounded-md border border-np-light px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
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
                            <input v-model="password_second" id="password" name="password"
                                :type="passwordVisible ? 'text' : 'password'" autocomplete="current-password"
                                required="true"
                                class="block w-full appearance-none bg-np-base text-np-base rounded-md border border-np-light px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
                            <button tabindex="-1" class="text-xs absolute right-2 top-1 bg-np-base  h-5/6 flex items-center justify-center"
                                @click="togglePasswordVisibility()">
                                <component class="h-5 w-5 text-np-base" :is="passwordVisible ? 'EyeSlashIcon': 'EyeIcon'">
                                </component>
                            </button>
                        </div>
                    </div>
                    <div>
                        <DynamicButton :parentMethod="dispatchPasswordReset" :buttonText="'Reset my password'"
                            :confirmRequired="false" />
                    </div>
                    <div class="font-light text-xs text-np-base">
                        If you are having any bother resetting your password, feel free to email me at <span class="font-semibold">ben@ninepanels.com</span> 👍
                    </div>

            </form>
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
            password_first: '',
            password_second: '',
            passwordVisible: false,
            email: this.$route.query.email,
            password_reset_token: this.$route.query.password_reset_token
        }
    },
    computed: {
        ...mapStores(useStore)
    },
    methods: {
        async dispatchPasswordReset() {

            if (this.password_first !== this.password_second) {
                this.Store.messages.push({ message: "New passwords do not match" })
                setTimeout(() => this.Store.messages.shift(), 5000)
                return // stop function
            }

            const resp = await this.Store.sendPasswordReset(this.password_second, this.email, this.password_reset_token)
            this.password_first = ''
            this.password_second = ''
            if (resp) {
                this.$router.push({ name: 'SignIn' })
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