<template >
  <div class="flex flex-col justify-between h-full text-np-base">
    <div class="space-y-4">

      <div class="font-bold flex justify-between">
        <div>

          {{ method_path.method }}
          {{ method_path.path }}
        </div>
        <div v-if="method_path.stats.in_alert" class="bg-np-alert text-white rounded-md text-xs h-5 px-2 text-center pt-0.5">alert</div>
      </div>

      <div>
        <div class="mb-2">
          Server
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
            <td>{{ method_path.stats.avg.toFixed(2) }}ms</td>
            <td>{{ method_path.stats.last.toFixed(2) }}ms</td>
            <td>{{ method_path.stats.min.toFixed(2) }}ms</td>
            <td>{{ method_path.stats.max.toFixed(2) }}ms</td>
            <td>{{ method_path.stats.alert_threshold.toFixed(2) }}ms</td>
          </tbody>

        </table>
      </div>

      <div>
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
  data() {
    return {
    }
  }

}

</script>