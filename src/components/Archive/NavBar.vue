<template>
  <header class="bg-gray-800  w-full z-50 sticky top-0">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex w-full items-center justify-between py-2 lg:border-none">
        <div class="flex items-center">
          <router-link :to="{ name: 'Landing' }">
            <span class="sr-only">Nine Panels logo</span>
            <Logo />
          </router-link>
        </div>
      </div>
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