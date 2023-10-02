<template >
  <div class="flex flex-col justify-between text-np-base">
    <Bar v-if="this.chartData.datasets[0].data" id="my-chart-id" :options="chartOptions" :data="chartData" />

  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'

import {
  Chart as ChartJS,
  Title,
  Tooltip,

  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)



export default {
  computed: {
    ...mapStores(useStore),

  },
  methods: {
    async getRouteTimings() {

      const resp = await this.Store.readRouteTimings(this.method_path.method_path)

      this.chartData.datasets[0].data = resp.readings.reverse()
      this.chartData.labels =resp.timestamps.reverse()
    }
  },
  components: {
    ChevronDownIcon,
    ChevronLeftIcon,
    Bar
  },
  mounted() {
    this.getRouteTimings()
  },
  props: {
    method_path: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: null,
        datasets: [{
          label: "readings",
          data: null,
          backgroundColor: '#4B5563'
        }],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false
          }
        }
      }
    }
  }

}

</script>

