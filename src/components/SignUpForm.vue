<template>
    <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8 ">
        <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
            <!-- <h2 class="mt-4 text-center text-3xl font-bold tracking-tight text-gray-600">Sign up to get started</h2> -->
            <div class="mt-4"></div>
        </div>


        <div class=" sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-4 px-4 sm:rounded-lg sm:px-10 ">
                <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
                    <div>
                        <label for="email" class="block font-light text-xs text-gray-800">Email address</label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" required="true" v-model="email"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="name" class="block font-light text-xs text-gray-800">Name</label>
                        <div class="mt-1">
                            <input id="name" name="name" type="text" autocomplete="given-name" required="true"
                                v-model="name"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password_first" class="block font-light text-xs text-gray-800">Password</label>
                        <div class="mt-1">
                            <input id="password_first" name="password" type="password" v-model="password_first"
                                required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password_second" class="block font-light text-xs text-gray-800">Repeat password</label>
                        <div class="mt-1">
                            <input id="password_second" name="password" type="password" v-model="password_second"
                                required="true"
                                class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400  focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
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
import NProgress from 'nprogress'

export default {
    data() {
        return {
            email: '',
            name: '',
            password_first: '',
            password_second: '',
            passwordMismatch: false
        }
    },
    computed: {
        ...mapStores(useStore)
    },
    methods: {
        async signUserUp() {

            if (this.password_first !== this.password_second) {
                this.passwordMismatch = true
                this.Store.messages.push({ message: "Passwords do not match" })
                setTimeout(() => this.Store.messages.shift(), 5000)
                return // stop function
            }

            NProgress.start()
            const resp = await this.Store.createUserAction(this.email, this.name, this.password_second)
            NProgress.done()
            if (resp) {
                this.$router.push({ name: 'Panels' })
            }
        }
    }

}

</script>