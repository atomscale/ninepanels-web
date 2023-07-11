<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template >
    <NavBar />
    <SignUpForm />
    <CookieAccept />
</template>

<script setup>
import CookieAccept from '@/components/CookieAccept.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import NavBar from '@/components/NavBar.vue'


</script>
