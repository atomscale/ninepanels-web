<template>
  <div class="flex h-full flex-col mx-auto justify-between items-center">

    <div class="mt-12 sm:mx-auto sm:w-full sm:max-w-md">

      <div class="text-np-base  text-sm mx-4 font-light">
        <div class="text-sm text-np-base font-light mb-2 text-center">As JME once said:</div>
        <div class="italic font-serif text-3xl font-extrabold text-center">"Can't see you on no sold out tour, HTTP error
          404"</div>

        <div class="mt-10  h-full">

          <div class="flex flex-col items-center space-y-3 w-full">
            <div v-if="mainStore.user" class="font-semibold  text-np-base">
              <router-link :to="{ name: 'Panels' }">Back to your panels...</router-link>
            </div>
            <div v-else class="flex flex-col items-center space-y-3 w-full">

              <div class="font-semibold  text-np-base">
                <router-link :to="{ name: 'SignIn' }">Sign in...</router-link>
              </div>
              <div class="font-semibold  text-np-base">
                <router-link :to="{ name: 'PasswordReset' }">Forgot your password?</router-link>
              </div>
              <div class="font-semibold text-np-base">
                <router-link :to="{ name: 'SignUp' }">Need an account...?</router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import rollbar from '@/rollbarClient.js'
import { useMainStore } from '@/stores/store.js'
import { mapStores } from 'pinia'


export default {
  computed: {
    ...mapStores(useMainStore)
  },
  mounted() {
    rollbar.info(`app: 404 loaded for requested route: ${this.$route.path}`)
  }
}

</script>
