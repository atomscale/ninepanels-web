<template>
    <div v-if="Store.user" class="flex flex-col h-full mt-2 space-y-4 mr-4 text-np-base text-sm">
        <div class="w-full flex justify-between">
            <div>Name</div>
            <div>{{ Store.user.name }}</div>
        </div>
        <div class="w-full flex justify-between">
            <div>Email</div>
            <div>{{ Store.user.email }}</div>
        </div>
        <button @click="Store.openRightTray('PasswordResetRequestForm')" class="flex justify-between w-full">

            <div>Change password</div>
            <ChevronRightIcon class="h-4" />
        </button>
        <div v-if="Store.user.is_admin" class="w-full flex justify-between">
            <div>Admin?</div>
            <div>Yep</div>
        </div>

    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import DynamicButton from '@/components/general/DynamicButton.vue'

export default {
    computed: {
        ...mapStores(useStore)
    },
    methods: {
        async sendUserDelete() {
            await this.Store.deleteUserAction()
            this.$router.push('/')
        },
        async readUser() {
            await this.Store.readUserAction()
        }
    },
    mounted() {
        this.readUser()
    },

    components: {
        DynamicButton,
        ChevronRightIcon
    },

}
</script>