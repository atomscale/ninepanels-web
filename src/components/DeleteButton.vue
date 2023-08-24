<template>


        <button v-if="!this.buttonConfirmState" type="submit" @click="toggleConfirmState()" :aria-label="this.buttonText"
            class="flex justify-center mb-4 border border-gray-200 rounded-md w-full mt-8 max-w-sm  py-2 px-4 text-sm bg-gray-800 text-gray-50 hover:text-gray-300 transition ease-in-out duration-200 shadow-sm">
           {{ this.buttonText }}
        </button>



        <div v-else
            class="flex justify-center mb-4 border border-gray-200 rounded-md w-full mt-8 max-w-sm  py-2 px-4 text-sm bg-gray-800 text-gray-50  shadow-sm">
            <button aria-label="Confirm button action" class="px-2 mr-5 hover:scale-125 transition ease-in-out duration-200 " @click="dispatchParentMethod()">

                <CheckIcon class="h-5 w-5 text-gray-100 " />
            </button>
            <div>{{ this.confirmText }}</div>
            <button aria-label="Cancel" class=" top-3 px-2 ml-5 hover:scale-125 transition ease-in-out duration-200" @click="toggleConfirmState()">

                <XMarkIcon class="h-5 w-5 text-gray-100 " />
            </button>
        </div>

</template>

<script>

import {
    XMarkIcon,
    CheckIcon
} from '@heroicons/vue/24/outline'

export default {
    data() {
        return {
            buttonConfirmState: false
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
        confirmText: {
            type: String,
            required: true
        }
    },
    methods: {
        dispatchParentMethod() {
            this.parentMethod()
        },
        toggleConfirmState() {
            this.buttonConfirmState = !this.buttonConfirmState
        }
    },
    components: {
        XMarkIcon,
        CheckIcon
    }

}
</script>