<template >
  <div class="flex h-full flex-col mx-auto justify-between overflow-scroll">

    <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-np-base   sm:rounded-lg  mt-2">
        <div class="text-np-base pb-3 text-sm space-y-3 mx-4 font-light">
          <div class="text-2xl font-bold">Privacy Policy for ninepanels.com </div>
          <div class="text-xl font-semibold">
            Introduction
          </div>
          <div>

            At Ninepanels, we're committed to protecting your privacy and complying with the General Data Protection
            Regulation (GDPR). This policy outlines what data we collect, how we store it, and what we do with it.
          </div>

          <div class="text-xl font-semibold">What Data We Collect and Why</div>

          <div>Our legal basis for collecting and processing personal data is to provide you with the best possible
            service.
            This includes basic account information like email addresses and names, as well as activity data such as
            account
            creation and last active dates.</div>

          <div class="text-xl font-semibold">How We Store Your Data</div>
          <div>Your data is securely stored in dedicated database instances hosted by Supabase, with locations in London
            and
            Frankfurt. Data is encrypted during transit over HTTPS and is accessible only by authorized personnel.</div>

          <div class="text-xl font-semibold">Sharing Your Data</div>
          <div>We will never share your data. Period.</div>

          <div class="text-xl font-semibold">Your Control Over Data</div>

          <div>You can delete your account at any time, which is a genuine delete operation. Backup copies are kept for 7
            days
            and then permanently removed. You also have the right to request a copy of your data for portability and to
            correct any inaccuracies.</div>

          <div class="text-xl font-semibold">Changes to This Policy</div>
          <div>We will notify you via email of any significant changes to this privacy policy.</div>

          <div class="text-xl font-semibold">Data Breach Protocol</div>
          <div>In the event of a data breach, we will notify affected users and relevant authorities within 72 hours, in
            compliance with GDPR requirements.</div>

          <div class="text-xl font-semibold">Communication Preferences</div>

          <div>You may receive different types of communications from Nine Panels:</div>



          <li class="ml-4">Operational Emails: These include account creation confirmations, password reset notifications,
            and
            service
            updates. You'll receive these as part of using Ninepanels.</li>

          <li class="ml-4">Feature Announcements: Occasionally, we might send out emails about new features or other
            news
            related to Ninepanels. These are optional.</li>


          <div>For non-essential communications like feature announcements and newsletters, you will have the option to
            opt-in
            or opt-out. You can change this preference at any time.</div>

          <div>To manage your communication preferences, please email ben@ninepanels.com. Future development will allow
            you to simply go to your account settings and navigate to the 'Communication
            Preferences' section. There you will be able to toggle on or off the types of communications you wish to
            receive.</div>

          <div class="text-xl font-semibold">Contact Us</div>
          <div>For any questions, concerns, or to exercise your GDPR rights, please email Nine Panels at
            ben@ninepanels.com.</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {
  },
  components: {
  },
  data() {
    return {
    }
  }
}

</script>