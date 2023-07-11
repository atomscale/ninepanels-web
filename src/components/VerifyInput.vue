<template>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-600">Please verify your account</h2>

        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="onSubmit" class="space-y-6" action="#" method="POST">
                    <div class="text-sm text-gray-600 text-center">A code was emailed to {{mainStore.user.email_value}}, enter that below.</div>
                    <div>

                        <div class="mt-1">
                            <input v-model="data.auth_code" id="auth_code" name="auth_code"  inputmode="numeric" placeholder="- - - -"
                                required="true"
                                class="block w-full text-center text-blue-800 font-mono text-2xl rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                        </div>
                    </div>



                    <div>
                        <button type="submit"
                            class="w-full justify-center rounded-md border border-transparent
                             bg-blue-400 py-2 px-4 text-sm font-bold text-white shadow-sm
                              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            @click="sendAuthCode()">
                            Verify
                        </button>

                        <button type="submit"
                            class="w-full mt-2 justify-center rounded-md border border-transparent
                             bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm
                              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            @click="reqNewCode()">
                            Request new code
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/stores/mainStore.js'
import { useRouter } from 'vue-router'

const mainStore = useMainStore()
const router = useRouter()

const data = ref({
    auth_code: null
})


function sendAuthCode() {
    mainStore.verifyUser(mainStore.user.id, this.data.auth_code)
    router.push({name: "Console"})
}

function reqNewCode() {
    mainStore.newAuthCode(mainStore.user.id)
    // router.push({name: "Landing"})
}

</script>