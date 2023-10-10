<template>
    <div class="flex flex-col h-full mt-2">
        <div class="w-full">
            <div v-if="Store.user">
                <div class="text-sm  h-5 text-np-base">Name</div>
                <div class="mb-2 font-light text-np-base">{{ Store.user.name }}</div>
                <div class="text-sm  h-5 text-np-base">Email</div>
                <div class="mb-2 font-light text-np-base">{{ Store.user.email }}</div>
                <div v-if="Store.user.is_admin" class="text-sm  h-5 text-np-base">Admin?</div>
                <div v-if="Store.user.is_admin" class="mb-2 font-light text-np-base">Yep</div>

            </div>
        </div>

    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import DynamicButton from '@/components/utilities/DynamicButton.vue'

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
        DynamicButton
    },

}
</script>