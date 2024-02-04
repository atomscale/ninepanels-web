<template>
    <div class="flex min-h-full flex-col justify-between  ">

        <div class="bg-np-base sm:rounded-lg ">
            <form   @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                <div v-if="!Store.user" class="font-bold text-xl text-np-base">Let's reset your password:
                </div>
                <div v-else class="font-bold text-xl text-np-base">Let's change your password:
                </div>
                <div class="font-light text-xs text-np-base">You will receive an email with a secure single-use link. Click the
                    link in the email to set a new password. The link
                    is valid for ten minutes.<br /><br />The email will come from
                    <span class="">ben@ninepanels.com.</span> <br /> <br />Feel free to email me if you need any help. 👍
                </div>
                <div>
                    <label for="email" class="block font-light text-xs text-np-base">Email address</label>
                    <div class="mt-1">
                        <input id="email" name="email" type="email" required="true" v-model="email"
                            class="block w-full  appearance-none  bg-np-base text-np-base rounded-md border border-np-base px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                    </div>
                </div>
                <div>
                    <DynamicButton :parentMethod="dispatchStartPasswordResetFlow" :buttonText="Store.user ? 'Change your password': 'Get a reset link'"
                        :confirmRequired="false" />
                </div>
                <div class="flex justify-between">
                    <div class="font-semibold text-xs text-np-base">

                    </div>
                    <div v-if="!Store.user" class="font-semibold text-xs text-np-base">
                        <button @click="Store.openRightTray('SignUpForm', null, 'PasswordResetRequestForm', null)">Need an account?</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useStore } from '@/stores/store.js'

import { CheckBadgeIcon } from '@heroicons/vue/24/outline'

import DynamicButton from '@/components/general/DynamicButton.vue'

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
                this.Store.openRightTray('PasswordResetRequestConfirm')
            }
        }
    },
    components: {
        DynamicButton,
        CheckBadgeIcon
    }

}

</script>