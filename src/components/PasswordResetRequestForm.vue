<template>
    <div class="flex min-h-full flex-col justify-between py-6 mt-4 sm:px-6 lg:px-8 ">




            <div class="bg-white py-4 sm:rounded-lg sm:px-10 ">
                <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                    <div class="font-bold text-lg text-gray-500 ">Let's reset your password:
                    </div>
                    <div>
                        <label for="email" class="block font-light text-xs text-gray-800">Email address</label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" required="true" v-model="email"
                                class="block w-full appearance-none text-gray-600 rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                        </div>
                    </div>
                    <div>
                        <DynamicButton :parentMethod="dispatchStartPasswordResetFlow" :buttonText="'Get a reset email'"
                            :confirmRequired="false" />
                    </div>
                    <div class="font-light text-xs text-gray-500">You will receive an email you a reset link to click. This
                        is valid for one hour. Click the link to set a new password. <br /><br />The email will come from
                        <span class="font-semibold">ben@ninepanels.com.</span> <br/> <br/>Feel free to email me if you need any help. 👍
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
import DynamicButton from '@/components/DynamicButton.vue'

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


            this.Store.loadingBar = true
            const resp = await this.Store.startPasswordResetFlow(this.email)
            this.Store.loadingBar = false
            this.email = ''
            // if (resp) {
            //     this.$router.push({ name: 'Panels' })
            // }
        }
    },
    components: {

        DynamicButton
    }

}

</script>