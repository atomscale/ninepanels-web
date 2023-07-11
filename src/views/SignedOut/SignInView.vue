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
    <SignInForm />


</template>

<script setup>

import SignInForm from '@/components/SignInForm.vue'
import NavBar from '@/components/NavBar.vue'



</script>
