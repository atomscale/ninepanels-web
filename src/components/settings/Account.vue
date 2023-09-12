<template>
    <div class="flex flex-col h-full mt-2">
        <div class="w-full">
            <div v-if="Store.user">
                <div class="data-heading">Name</div>
                <div class="mb-2 text-np-base">{{ Store.user.name }}</div>
                <div class="data-heading">Email</div>
                <div class="mb-2 text-np-base">{{ Store.user.email }}</div>
            </div>
        </div>
        <div class="flex justify-around mt-6">
            <DynamicButton class="w-2/3" :parentMethod="sendUserDelete" :confirmRequired="true" :buttonText="'Delete Account'"
                :confirmText="'Are you sure?'" />
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
        async getUserActionMethod() {
            await this.Store.readUserAction()
        },
    },

    components: {
        DynamicButton
    },

}
</script>