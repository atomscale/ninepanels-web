<template>
    <div v-if="mainStore.routePerformance" class="h-96 w-full inline-block overflow-scroll">


        <table class="w-full ">
            <thead class="w-full ">
                <tr class="">
                    <th scope="col"
                        class="bg-np-base opacity-90 sticky z-10 top-0 font-medium text-xs text-np-base text-left align-bottom pb-2">
                        Route
                    </th>
                    <th scope="col"
                        class="bg-np-base opacity-90 sticky z-10 top-0 font-medium text-xs text-np-base text-right pb-2">
                        <div class="font-extralight"> server
                        </div>
                        avg
                    </th>
                    <th scope="col"
                        class="bg-np-base opacity-90 sticky z-10 top-0 font-medium text-xs text-np-base text-right pb-2">
                        <div class="font-extralight"> server
                        </div>
                        last
                    </th>
                </tr>
            </thead>
            <tbody class="text-np-base text-xs ">

                <tr v-for="method_path in mainStore.routePerformance.data" :key="method_path.id"
                    @click="openRightTray(method_path)" class="cursor-pointer">


                    <td class="py-2">
                        <div class="whitespace-nowrap">
                            {{ method_path.method }}
                        </div>
                        <div class="font-medium">
                            {{ method_path.path }}
                        </div>
                    </td>

                    <td class="text-right w-14">
                        <div
                            :class="method_path.in_alert ? 'border border-np-alert text-center rounded-md bg-np-alert text-white' : ''">
                            {{ method_path.avg.toFixed(1) }}
                        </div>
                    </td>
                    <td class="text-right">{{ method_path.last.toFixed(1) }}</td>


                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>

import { useMainStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import { ArrowPathIcon } from '@heroicons/vue/24/outline'


export default {
    computed: {
        ...mapStores(useMainStore),

    },
    methods: {
        async getRoutePerformance() {
            await this.mainStore.readRoutePerformance()
        },
        openRightTray(method_path) {
            this.mainStore.rightTrayIsOpen = true
            this.mainStore.rightTrayComponentName = 'RoutePerformanceTray'
            this.mainStore.rightTrayComponentProps = { method_path: method_path }
        },
    },
    // mounted() {
    //     this.calcConsistencySize()
    // },
    components: {
        ArrowPathIcon,
    },
    data() {
        return {
            consistencySize: ''
        }
    }

}
</script>