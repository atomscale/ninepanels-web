<template >
  <div class="flex flex-col justify-between h-full text-np-base">
    <div class="space-y-4">

      <div class="font-bold flex justify-between">
        <div>

          {{ method_path.method }}
          {{ method_path.path }}
        </div>
        <div v-if="method_path.in_alert" class="bg-np-alert text-white rounded-md text-xs h-5 px-2 text-center pt-0.5">alert</div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-2">

          <div class="">
            Server
          </div>
          <!-- <div class="flex justify-end">
            <div class="text-xs text-center  align-middle py-1 mr-3">window:</div>
            <input class="border rounded-md w-14 text-sm text-center" v-model="Store.window_size" type="number" required="true" min="1" placeholder="avg"/>
            <button @click="">
              <CheckIcon class="h-4"/>
            </button>
          </div> -->
        </div>
        <table class="w-full">
          <thead class="text-xs">
            <tr>
              <th class="text-left font-extralight">avg</th>
              <th class="text-left font-extralight">last</th>
              <th class="text-left font-extralight">min</th>
              <th class="text-left font-extralight">max</th>
              <th class="text-left font-extralight">alert level</th>
            </tr>
          </thead>
          <tbody class="text-xs">
            <td>{{ method_path.avg.toFixed(2) }}ms</td>
            <td>{{ method_path.last.toFixed(2) }}ms</td>
            <td>{{ method_path.min.toFixed(2) }}ms</td>
            <td>{{ method_path.max.toFixed(2) }}ms</td>
            <td>{{ method_path.alert_threshold_ms.toFixed(2) }}ms</td>
          </tbody>

        </table>
      </div>

      <div v-if="this.Store.routePerformance">
        <RoutePerformanceChart :method_path="this.method_path" />
      </div>

    </div>

    <div :class="{ 'mb-4': this.Store.isPWA }">
      <!-- keep here for bottom stuff -->
    </div>

  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'

import RoutePerformanceChart from '@/components/admin/RoutePerformanceChart.vue'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {

  },
  components: {
    ChevronDownIcon,
    ChevronLeftIcon,
    RoutePerformanceChart
  },
  props: {
    method_path: {
      type: Object,
      required: true
    }
  },


}

</script>