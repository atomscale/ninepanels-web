<template>
    <div class="flex justify-between items-center ">
        <div class="text-np-light text-sm">
            Current theme: {{ Store.theme }}
        </div>


            <Listbox as="div" v-model="Store.theme">
                <div class="relative">

                    <ListboxButton
                        class="relative w-full cursor-default  py-1.5 pl-3 pr-10 text-left text-np-light text-sm ">
                        <span class="block truncate">{{ Store.theme }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-np-light" aria-hidden="true" />
                        </span>
                    </ListboxButton>
                    <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-40 border right-0 rounded-md py-1 text-sm">
                        <ListboxOption v-for="colour in colours" :key="colour" :value="colour"
                            v-slot="{ active, selected }">
                            <li
                                :class="[active ? 'bg-np-fill text-white' : 'text-np-base', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                <span :class="[selected ? 'font-bold' : 'font-light', 'block-truncate']">{{ colour }}</span>
                                <span v-if="selected"
                                    :class="[active ? 'text-white' : 'text-np-base', 'absolute inset-y-0 right-0 flex items-center pr-2']">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </div>
            </Listbox>


  
    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline'

export default {
    computed: {
        ...mapStores(useStore),

    },
    methods: {

    },

    components: {
        Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, CheckIcon, ChevronUpDownIcon
    },
    data() {
        return {
            colours: [
                'noir',
                'ocean'
            ],


        }
    }

}
</script>