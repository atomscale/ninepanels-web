<template >
  <div class="flex flex-col justify-between text-np-base">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />

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

  },
  components: {
    ChevronDownIcon,
    ChevronLeftIcon,
    Bar
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
        labels: this.method_path.readings.timestamp,
        datasets: [{
          label: "readings",
          data: this.method_path.readings.reading,
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

