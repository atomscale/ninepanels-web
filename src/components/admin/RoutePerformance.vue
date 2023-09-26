<template>
    <div class="h-full w-full inline-block">
        <table class="w-full divide-y-2 divide-np-base ">
            <thead class="">
                <tr class="">
                    <th scope="col" class="font-medium text-xs text-np-base text-left pb-2">Route</th>

                    <th scope="col" class="font-medium text-xs text-np-base text-right pb-2">Avg</th>
                    <th scope="col" class="font-medium text-xs text-np-base text-right pb-2">Last</th>
                </tr>
            </thead>
            <tbody class="text-np-base text-xs divide-y divide-np-base">

                <tr v-for="method_path in Store.routePerformance" :key="method_path.id" @click="buttonTest" class="cursor-pointer">
                    <td class="py-2">
                        <div class="whitespace-nowrap">
                            {{ method_path.method }}
                        </div>
                        <div class="font-medium">
                            {{ method_path.path }}
                        </div>
                    </td>

                    <td class="text-right">
                    <div :class="method_path.stats.in_alert ? 'border border-np-alert text-center rounded-md bg-np-alert text-white': ''">
                        {{ method_path.stats.avg.toFixed(1) }}
                    </div ></td>
                    <td class="text-right">{{ method_path.stats.last.toFixed(1) }}</td>

                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import RoutePerformanceCard from '@/components/admin/RoutePerformanceCard.vue'

export default {
    computed: {
        ...mapStores(useStore)
    },
    methods: {
        async readRoutePerformance() {
            await this.Store.readRoutePerformance()
        },
        buttonTest() {
            console.log("buttony boo")
        }
    },
    mounted() {
        this.readRoutePerformance()
    },

    components: {
        RoutePerformanceCard
    },

}
</script>