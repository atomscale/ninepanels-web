<template >

  <PasswordResetForm v-if="this.$route.query.user_id && this.$route.query.password_reset_token" />
  <PasswordResetRequestForm v-else />

</template>

<script>

import PasswordResetRequestForm from '@/components/PasswordResetRequestForm.vue'
import PasswordResetForm from '@/components/PasswordResetForm.vue'


export default {
  components: {
      PasswordResetRequestForm,
      PasswordResetForm
  }
}


</script>