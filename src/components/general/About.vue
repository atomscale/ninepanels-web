<template >
  <div class="flex h-full flex-col mx-auto justify-between overflow-scroll">

    <div class="sm:mx-auto sm:w-full sm:max-w-md ">
      <div class="bg-np-base  sm:rounded-lg  ">
        <div class="text-np-base text-sm space-y-3 font-light">
          <div class="text-2xl text-np-base font-bold">Daily balance meets long term consistency.</div>
          <div class="">I've always found being long-term consistent at one thing quite hard.
          </div>
          <div class="">Being consistent at all the things over a long period of time
            seems impossible!
          </div>
          <div class="">For me, if consistency is attained in one thing, sight is lost of all the other things.
          </div>
          <div class="">This can cause problems.
          </div>
          <div class="">Additionally, my perception and memory of my consistency was not very accruate.
          </div>
          <div class="">So, I built a simple app to help keep all my important things visible and keep an eye on my
            consistency. (well, up to nine
            of them...)
          </div>
          <div class="">I told my friend about it, he said it might be useful to him, and it has been.
          </div>
          <div class="">So I thought, let's make it free to everyone, forever (and never, ever run ads!).
          </div>
          <div class="">So here we are, at ninepanels.com.
          </div>
          <div class=""> It's open source, still early and unfinished. Get in touch with feedback or ideas:
          </div>
          <div class="font-bold"><a href="https://github.com/atomscale/ninepanels" target="_blank">Github</a></div>
          <div class="font-bold"><a href="mailto:ben@ninepanels.com" target="_blank">Email me</a></div>
          <div class=""> Thanks, Ben
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