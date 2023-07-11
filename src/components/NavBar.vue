<template>
  <header class="bg-gray-800  w-full z-50 sticky top-0">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex w-full items-center justify-between py-3 lg:border-none">
        <div class="flex items-center">
          <router-link :to="{ name: 'Landing' }">
            <span class="sr-only">Nine Panels logo</span>
            <Logo />
          </router-link>
          <!-- <div class="ml-10 hidden space-x-8 lg:block">
            <a v-for="link in navigation" :key="link.name" :href="link.href"
              class="rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-gray-50">{{ link.name }}</a>
          </div> -->
        </div>
        <!-- <div class="">
          <router-link :to="{ name: 'SignIn' }"
            class="inline-block  rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-gray-50">
            Sign
            in</router-link>
          <router-link :to="{ name: 'SignUp' }"
            class="inline-block rounded-md  py-2 px-4 text-base font-bold hover:bg-gray-900 text-blue-400 ">Join Free
          </router-link>
        </div> -->
      </div>
      <!-- <div class="flex flex-wrap justify-center space-x-6 py-1 lg:hidden">
        <router-link v-for="link in navigation" :key="link.name" :to="link.href"
          class="rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-gray-50">{{ link.name }}</router-link>
      </div> -->
    </nav>
  </header>
</template>

<script>
import Logo from "@/components/Logo.vue"

export default {
  components: {
    Logo
  }
}
</script>