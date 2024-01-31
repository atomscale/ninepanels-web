<template >
  <!-- <PasswordResetForm v-if="this.$route.query.email && this.$route.query.password_reset_token" /> -->
</template>

<script>
import { mapStores } from 'pinia'
import { useStore } from '@/stores/store.js'

export default {
  computed: {
    ...mapStores(useStore)
  },
  mounted() {
    this.Store.openRightTray('PasswordResetForm', {email: this.$route.query.email, password_reset_token: this.$route.query.password_reset_token})
    this.$router.push({ name: 'Panels' })
  },

}


</script>