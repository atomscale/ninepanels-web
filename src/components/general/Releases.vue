<template >
  <div class="flex h-full flex-col mx-auto justify-between overflow-scroll">

    <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-np-base   sm:rounded-lg  mt-2">
        <div class="text-np-base pb-3 text-sm space-y-3 mx-4 font-light">

          <div class="text-2xl font-extrabold">
            Version 5 - A refreshed UI for better consistency visibility
          </div>
          <div>

            The whole app has been simplified, refined and enhanced.
          </div>
          <div class="font-semibold text-xl">

            Tap to focus, tap to toggle:
          </div>
          <div class="">

            Tap to focus onto a panel. This then shows your recent consistency.<br>
            <br>

            Tap again to toggle the panel's completion.<br>
            <br>

            Tap white space in the lower half of the screen to remove focus and the graph.
          </div>

          <div class="font-semibold text-xl">

            Refined layout:
          </div>
          <div class="">

            The top nav bar has been removed to provide more space.<br>
            <br>

            The left menu is available from the three bar icon in the bottom left.
            <br>
            <br>

            The panel create form button is more visible.
          </div>
          <div class="font-semibold text-xl">

            Improved guide:
          </div>
          <div class="">

            Refreshed tips and approaches on how to use Ninepanels.
          </div>
          <div class="font-semibold text-xl">

            Account management:
          </div>
          <div class="">

            You can change your password in Settings > Account
          </div>
          <div class="font-semibold text-xl">

            Loadsa techie stuff:
          </div>
          <div class="">

            A bunch of back and front end improvements to lay the foundations for major new features coming soon.
          </div>
          <div class="pt-4">

            Cheers, Ben 🙏👨‍💻🤙
          </div>



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