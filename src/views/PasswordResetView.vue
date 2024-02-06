<template >
</template>

<script>
import { mapStores } from 'pinia'
import { useMainStore } from '@/stores/store.js'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
  mounted() {
    this.mainStore.openRightTray('PasswordResetForm', {email: this.$route.query.email, password_reset_token: this.$route.query.password_reset_token})
    this.$router.push({ name: 'Panels' })
  },

}


</script>