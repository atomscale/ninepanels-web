<template>
    <div  v-if="this.confirmRequired">
        <button   v-if="!this.buttonConfirmState" type="submit" @click="toggleConfirmState()" :aria-label="this.buttonText"
            class="flex justify-center border text-np-alert border-np-alert rounded-md w-full  py-2 px-4 text-sm bg-np-base   transition ease-in-out duration-200 shadow-sm">
            {{ this.buttonText }}
        </button>

        <div v-else
            class="flex justify-center  border border-np-alert bg-np-alert rounded-md w-full  py-2 px-4 text-sm  text-white  shadow-sm">
            <button aria-label="Confirm button action"
                class="px-2 mr-5 hover:scale-125 transition ease-in-out duration-200 " @click="dispatchParentMethod()">

                <CheckIcon class="h-5 w-5 text-white " />
            </button>
            <div>{{ this.confirmText }}</div>
            <button aria-label="Cancel" class=" top-3 px-2 ml-5 hover:scale-125 transition ease-in-out duration-200"
                @click="toggleConfirmState()">

                <XMarkIcon class="h-5 w-5 text-white " />
            </button>
        </div>
    </div>

    <div v-else>

        <button type="submit" @click="dispatchParentMethod()" :aria-label="this.buttonText"
            class="h-10 flex justify-center mb-4 border border-np-base rounded-md w-full  py-2 px-4 text-sm bg-np-base text-np-base  transition ease-in-out duration-200 shadow-sm">
            <span v-if="!this.isLoading">{{ this.buttonText }}</span>
            <LoaderSpin v-else />
        </button>
    </div>
</template>

<script>

import {
    XMarkIcon,
    CheckIcon
} from '@heroicons/vue/24/outline'

import LoaderSpin from '@/components/utilities/LoaderSpin.vue'

export default {
    data() {
        return {
            buttonConfirmState: false,
            isLoading: false
        }
    },
    props: {
        parentMethod: {
            type: Function,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        },
        confirmRequired: {
            type: Boolean,
            required: true,
            default: true
        },
        confirmText: {
            type: String,
            required: false
        },
    },
    methods: {
        async dispatchParentMethod() {
            this.isLoading = true
            await this.parentMethod()
            this.isLoading = false
        },
        toggleConfirmState() {
            this.buttonConfirmState = !this.buttonConfirmState
        }
    },
    components: {
        XMarkIcon,
        CheckIcon,
        LoaderSpin
    }

}
</script>