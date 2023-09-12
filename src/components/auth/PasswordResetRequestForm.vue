<template>
    <div class="flex min-h-full flex-col justify-between px-4 py-6 mt-4 ">

        <div class="bg-white py-4 sm:rounded-lg sm:px-10 ">
            <form v-if="!this.Store.passwordResetRequested"  @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                <div class="font-bold text-lg text-gray-500 ">Let's reset your password:
                </div>
                <div>
                    <label for="email" class="block font-light text-xs text-gray-800">Email address</label>
                    <div class="mt-1">
                        <input id="email" name="email" type="email" required="true" v-model="email"
                            class="block w-full appearance-none text-np-base rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                    </div>
                </div>
                <div>
                    <DynamicButton :parentMethod="dispatchStartPasswordResetFlow" :buttonText="'Get a reset link'"
                        :confirmRequired="false" />
                </div>
                <div class="font-light text-xs text-gray-500">You will receive an email with a reset link. Click the reset
                    link in the email to set a new password. The link
                    is valid for ten minutes.<br /><br />The email will come from
                    <span class="">ben@ninepanels.com.</span> <br /> <br />Feel free to email me if you need any help. 👍
                </div>
                <div class="flex justify-between">
                    <div class="font-semibold text-xs text-gray-500">
                        <router-link :to=" { name: 'SignUp' }">Sign in instead</router-link>
                    </div>
                    <div class="font-semibold text-xs text-gray-500">
                        <router-link :to=" { name: 'SignUp' }">Need an account?</router-link>
                    </div>
                </div>
            </form>
            <div v-else class="font-bold text-lg text-gray-500 mt-20">
                An email is winging it's way to you now.
                <div class="text-sm font-light mt-2">Click the link within ten minutes.</div>
                <div class="flex justify-center">
                    <img loading="eager" class="h-36 mt-6 mb-4 w-auto rounded-2xl" src="/android-chrome-512x512.png"
                    alt="9P logo" />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useStore } from '@/stores/store.js'

import DynamicButton from '@/components/utilities/DynamicButton.vue'

export default {
    data() {
        return {
            email: '',
        }
    },
    computed: {
        ...mapStores(useStore)
    },
    methods: {
        async dispatchStartPasswordResetFlow() {
            const resp = await this.Store.startPasswordResetFlow(this.email)
            this.email = ''
            if (resp) {
                this.Store.passwordResetRequested = true
            }
        }
    },
    components: {
        DynamicButton
    }

}

</script>