<template class="bg-gray-50">

  <div>
    <NavBar />
    <CTA />
    <BadgesOfHonour />
    <Features />
    <Pricing />
    <Team />
    <EmailSignUp />
    <!-- <CookieAccept /> -->
    <FooterBar />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import CTA from '@/components/CTA.vue'
import Features from '@/components/Features.vue'
import BadgesOfHonour from '@/components/BadgesOfHonour.vue'
import Pricing from '@/components/Pricing.vue'
import Team from '@/components/Team.vue'
import EmailSignUp from '@/components/EmailSignUp.vue'
import FooterBar from '@/components/FooterBar.vue'

import { useMainStore } from '@/stores/mainStore.js'
import { mapStores } from 'pinia'


export default {
  computed: {
    ...mapStores(useMainStore)
  },
  components: {
    NavBar,
    CTA,
    Features,
    BadgesOfHonour,
    Pricing,
    Team,
    EmailSignUp,
    FooterBar
  },
  // created() {
  //   this.mainStore.getUser()

  // }

}

</script>