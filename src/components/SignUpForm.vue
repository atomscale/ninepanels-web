<template>
    <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8 ">
        <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
            <!-- <h2 class="mt-4 text-center text-3xl font-bold tracking-tight text-gray-600">Sign up to get started</h2> -->
            <div class="mt-6"></div>
        </div>


        <div class=" sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-4 px-4 sm:rounded-lg sm:px-10 text-sm">
                <form @submit.prevent="onSubmit" class="space-y-6" action="#" method="POST">
                    <div>
                        <label for="email" class="block font-light text-xs text-gray-800">Email address</label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" autocomplete="email" required="true" v-model="email"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="name" class="block font-light text-xs text-gray-800">Name</label>
                        <div class="mt-1">
                            <input id="name" name="name" type="text" autocomplete="given-name" required="true"
                                v-model="name"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block font-light text-xs text-gray-800">Password</label>
                        <div class="mt-1">
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                v-model="password" required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  sm:text-sm" />
                        </div>
                    </div>



                    <div>
                        <button type="submit" @click="signUserUp()"
                            class="flex justify-center border border-gray-200 rounded-md w-full mt-3 max-w-sm  py-2 px-4 text-sm bg-gray-800 text-gray-50 hover:bg-white hover:text-gray-600  shadow-sm">Sign
                            up
                        </button>
                    </div>
                    <div class="font-light text-xs text-gray-500 m-4">Built for me. Free to you. No ads, ever.
                    </div>
                    <div class="font-light text-xs text-gray-500 m-4">By signing up you agree for ninepanels.com to store
                        your data. It will never, ever be sold.</div>

                    <div class="font-light text-xs text-gray-500 m-4">By signing up you also agree to a single, lonely
                        little cookie being stored on your device.</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useStore } from '@/stores/store.js'

export default {
    data() {
        return {
            email: 'bwdyer@gmail.com',
            name: 'ProperBen',
            password: 'newpassword'
        }
    },
    computed: {
        ...mapStores(useStore)
    },
    methods: {
        async signUserUp() {
            const resp = await this.Store.createUserAction(this.email, this.name, this.password)
            if (resp) {
                this.$router.push({ name: 'Panels' })
            }
        }
    }

}

</script>